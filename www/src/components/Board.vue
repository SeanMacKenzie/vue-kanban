<template>
  <div class="jumbotron">
    <div class="container">

      <div class="row">
        <div class="col-md-3">{{board.name}}</div>
        <div class="col-md-3">{{board.description}}</div>
        <div class="col-md-3">{{board._id}}</div>
        <div class="col-md-3">Created on: {{board.created}}</div>
      </div>
      <div class="row text-center">
        <h1>{{board.name}}</h1>
        <div v-if="listForm" class="listForm">
          <form class="form" @submit.prevent="submitList">
            <div class="form-group">
              <label for="name">List name</label>
              <input class="form-control" type="text" name="name" placeholder="List name" v-model='newList.name' required>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input class="form-control" type="text" name="description" v-model='newList.description'>
            </div>
            <div class="form-group">
              <button type="submit">Create list</button>
            </div>
          </form>
        </div>
        <div v-else class="register">
        </div>
        <p v-if="listForm" @click="toggleListForm" class="action">Cancel</p>
        <p v-else @click="toggleListForm" class="action">Add a List</p>
      </div>
      <div class="row text-center">
        <div v-for="list in lists" class="panel panel-default">
          <list :name="list.name" :description="list.description" class="panel-body"></list>

        </div>
        <div class="row text-center">
          <div v-for="list in lists" class="col-md-4 panel panel-default">
            <list :name="list.name" :description="list.description" :listId="list._id"></list>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import list from './list'
  export default {
    name: 'board',
    data() {
      return {
        listForm: false,
        newList: {
          name: '',
          description: '',
          boardId: ''
        }
      }
    },
    mounted() {
      this.$store.dispatch('getBoard', this.$route.params.id)
      this.$store.dispatch('getLists', this.$route.params.id)
    },
    methods: {
      toggleListForm() {
        this.listForm = !this.listForm
      },
      submitList() {
        this.newList.boardId = this.board._id
        this.$store.dispatch('submitList', this.newList)
        this.newList = {
          name: '',
          description: '',
          boardId: ''
        }
      }
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.activeLists
      }
    },
    components: {
      list
    }
  }
</script>

<style scoped>
  .action {
    cursor: pointer;
    opacity: .7;
    transition: all .3s linear;
  }

  .action:hover {
    opacity: 1
  }

  .panel {
    display: inline-flex;
    text-align: center;
    justify-content: center;
    margin-inline-end: 5px;
    height: 400px;
    width: 200px
  }

  .container {
    margin-top: 0px;
    padding-top: 0px;
  }

  .jumbotron {
    height: 100px
  }
</style>