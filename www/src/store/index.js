import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
  state: {
    boards: [],
    activeBoard: {},
    activeLists: [],
    activeTasks: {},
    error: {},
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },

    setBoards(state, data) {
      state.boards = data
    },
    setLists(state, data) {
      // console.log('inside setlists', data)
      state.activeLists = data
    },
    setTasks(state, data) {
      console.log(data)
      vue.set(state.activeTasks, data[0].listId, data)
      //state.activeTasks[data[0].listId] = data
      console.log(state.activeTasks)
    },
    handleError(state, err) {
      state.error = err
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    }
  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts

    //AUTH
    submitLogin({ commit, dispatch }, user) {
      auth.post('login', user)
        .then(res => {
          commit('setUser', res.data.data)
          router.push({ name: 'Boards' })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {

          commit('setUser', {})
          router.push({ name: 'Login' })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    authenticate({ commit, dispatch }) {
      auth('authenticate', )
        .then(res => {
          commit('setUser', res.data.data)
          router.push({ name: 'Boards' })
        })
        .catch(() => {
          router.push({ name: 'Login' })
        })
    },

    submitRegister({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data.data)
          router.push({ name: 'Boards' })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //BOARD STUFF
    getBoards({ commit, dispatch }) {
      api('userboards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getBoard({ commit, dispatch }, id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    createBoard({ commit, dispatch }, board) {
      // debugger
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    //List stuff
    getLists({ commit, dispatch }, boardId) {
      api('boards/' + boardId + '/lists')
        .then(res => {
          // console.log("inside getlists:", res)
          commit('setLists', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    submitList({ commit, dispatch }, newList) {
      api.post('lists/', newList)
        .then(res => {
          dispatch('getLists', newList.boardId)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeList({ commit, dispatch }, payload) {
      api.delete('lists/' + payload._id)
        .then(res => {
          debugger
          dispatch('getLists', payload.boardId)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //Task Stuff
    getTasks({ commit, dispatch }, task) {
      api('boards/' + task.boardId + '/lists/' + task.listId + '/tasks')
        .then(res => {
          // console.log("inside gettasks:", res)
          commit('setTasks', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    submitTask({ commit, dispatch }, newTask) {
      api.post('tasks/', newTask)
        .then(res => {
          dispatch('getTasks', newTask)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //errors
    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    }
  }

})


export default store
