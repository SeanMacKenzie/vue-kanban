<template>
  <div class="board-page">
    <div class="container-fluid">

      <!-- <div class="row">
        <div class="col-md-3">Board Name: {{board.name}}</div>
        <div class="col-md-3">Board Description: {{board.description}}</div>
        <div class="col-md-3">Board Id: {{board._id}}</div>
        <div class="col-md-3">Created on: {{board.created}}</div>
      </div> -->

      <div class="row top-bar">
        <div class="col-sm-1">
          <h3 class="h3-custom">
            <router-link :to="'/'">
              <button class="btn btn-primary">
                <span class="glyphicon glyphicon-arrow-left"></span> Back to Boards</button>
            </router-link>
          </h3>
        </div>
        <div class="col-sm-1 col-sm-offset-10">
          <h3 class="h3-custom">
            <button class="btn btn-primary" @click="logout">Logout</button>
          </h3>
        </div>
      </div>

      <div class="text-center">
        <h1>{{board.name}}</h1>
        <h3>{{board.description}}</h3>

      </div>
      <div class="row text-center list-row">
        <div class="list-wrapper">
          <div v-for="(list, i) in lists" class="list-div">
            <div class="panel panel-default list-panel">
              <div class="panel-heading">
                <div class="pull-right">
                  <!-- <span @click="removeBoard(board)" class="glyphicon glyphicon-trash"></span> -->
                  <span @click="removeList(list)" class="glyphicon glyphicon-trash action-delete"></span>
                </div>
                {{list.name}}
              </div>
              <div class="panel-body">
                <list :list="list"></list>
              </div>
            </div>
          </div>

          <div class="add-list-button list-div">
            <div class="panel panel-default list-panel">
              <div class="panel-body">
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
                      <button type="submit" class="btn btn-success">Create list</button>
                      <button class="btn btn-primary" @click="toggleListForm">Cancel</button>
                    </div>
                  </form>
                </div>
                <!-- <div v-else class="register">
                  <button @click="toggleListForm" class="action btn btn-info">Add a List</button>
                </div> -->
                <div v-else>
                  <button @click="toggleListForm" class="form-list-plus">+</button>
                </div>
                <!-- <p v-if="listForm" @click="toggleListForm" class="action btn btn-danger">Cancel</p> -->
              </div>
            </div>

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
        this.listForm = false
        this.newList = {
          name: '',
          description: '',
          boardId: ''
        }
      },
      removeList(listId) {
        this.$store.dispatch('removeList', listId)
      },
      logout() {
        this.$store.dispatch('logout')
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

<style>
  .action {
    cursor: pointer;
    opacity: .7;
    transition: all .3s linear;
  }

  .action:hover {
    opacity: 1
  }

  /* .panel { */

  /* text-overflow: ellipsis; */

  /* display: inline-flex; */

  /* text-align: center; */

  /* justify-content: center; */

  /* margin-inline-end: 5px; */

  /* min-height: 400px; */

  /* width: 200px; */

  /* } */

  /* .inl-flex {
    display: inline-flex;
    margin-inline-end: 5px;
    min-height: 400px;
    width: 200px;
  } */

  /* .list-panel {
    overflow: auto;
    height: 600px;
    width: 200px;
  } */

  .list-div {
    display: inline-block;
    vertical-align: top;
    width: 400px;
    margin-left: 15px;
    margin-right: 15px;
  }

  .form-list-plus {
    font-size: 200px;
    line-height: 500px;
    width: 368px;
    background-color: white;
    border: none;
  }

  .list-row {
    overflow: auto;
  }

  .list-wrapper {
    white-space: nowrap;
    min-height: 55rem;
  }

  .add-list-button {
    width: 400px;
  }

  /* .container {
    margin-top: 0px;
    padding-top: 0px;
  } */

  /* .jumbotron {
    height: 100px
  } */
</style>