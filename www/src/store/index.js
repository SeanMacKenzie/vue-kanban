import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
// import $ from 'jquery'

let base = window.location.host.indexOf('localhost') > -1 ? '//localhost:3000/' : '/'

let api = axios.create({
  baseURL: '/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: '/',
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
    activeComments: {},
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
      // console.log(data)
      vue.set(state.activeTasks, data.listId, data.tasks)
      //state.activeTasks[data[0].listId] = data
      console.log(state.activeTasks)
    },
    setComments(state, data) {
      // debugger
      vue.set(state.activeComments, data.taskId, data.comments)
      console.log("Active comments: ", state.activeComments)
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
          dispatch('getLists', payload.boardId)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    //Task Stuff
    getTasks({ commit, dispatch }, task) {
      console.log('getting tasks from: ', task.listId)
      api('boards/' + task.boardId + '/lists/' + task.listId + '/tasks')
        .then(res => {
          // console.log("inside gettasks:", res)
          commit('setTasks', { listId: task.listId, tasks: res.data.data })
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

    moveTask({ commit, dispatch }, payload) {
      let req = { listId: payload.listId }
      api.put('tasks/' + payload.taskId, req)
        .then(res => {
          //REMIND JAKE TO SHOW MARK THIS MISTAKE
          dispatch('getTasks', { listId: payload.listId, boardId: payload.boardId })
          dispatch('getTasks', { listId: payload.oldList, boardId: payload.boardId })
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    removeTask({ commit, dispatch }, payload) {
      api.delete('tasks/' + payload.taskId)
        .then(res => {
          dispatch('getTasks', payload)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    // COMMENT STUFF

    getComments({ commit, dispatch }, comment) {
      // debugger
      console.log('getting comments from: ', comment.taskId)
      api('boards/' + comment.boardId + '/lists/' + comment.listId + '/tasks/' + comment.taskId + '/comments')
        // boards/:boardId/lists/:listId/tasks/:taskId/comments <- custom route for above
        .then(res => {
          console.log("inside getComments:", res)
          commit('setComments', { taskId: comment.taskId, comments: res.data.data })
          // debugger
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    submitComment({ commit, dispatch }, newComment) {
      api.post('comments/', newComment)
        .then(res => {
          dispatch('getComments', newComment)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeComment({ commit, dispatch }, payload) {
      api.delete('comments/' + payload.commentId)
        .then(res => {
          dispatch('getComments', payload)
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
