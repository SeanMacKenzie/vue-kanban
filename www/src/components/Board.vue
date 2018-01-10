<template>
  <div class="board-page">
    <div class="container-fluid">

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

      <div class="text-center board">
        <h1>{{board.name}}</h1>
        <h3>{{board.description}}</h3>

      </div>
      <div class="row text-center list-row">
        <div class="list-wrapper">
          <div v-for="(list, i) in lists" class="list-div">
            <div class="panel panel-default list-panel">
              <div class="panel-heading">
                <div class="pull-right lister">
                  <!-- <span @click="removeBoard(board)" class="glyphicon glyphicon-trash"></span> -->
                  <span @click="removeList(list)" class="glyphicon glyphicon-trash action-delete"></span>
                </div>
                <b>{{list.name}}</b>
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
  @import url('https://fonts.googleapis.com/css?family=Julius+Sans+One|Lekton|Overpass+Mono|Rock+Salt|Ubuntu+Mono');
  .action {
    cursor: pointer;
    opacity: .7;
    transition: all .3s linear;
  }

  .board {
    color: white;
  }

  .panel-heading {
    background-color: #80b6e5;
  }

  .panel {
    background-color: #999999;
  }

  .action:hover {
    opacity: 1
  }

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
    background-color: #999999;
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
  .lister {
    font-family: 'Overpass Mono', monospace;
  }

  h1 {
    font-family: 'Rock Salt', cursive;
  }

  h3 {
    font-family: 'Overpass Mono', monospace;
  }
</style>