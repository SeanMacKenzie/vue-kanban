<template>
  <div class="boards-page container-fluid">
    <div class="row top-bar">
      <div class="col-sm-4 col-sm-offset-4">
        <h3 class="h3-custom">{{user.name}}'s Boards</h3>
      </div>
      <div class="col-sm-1 col-sm-offset-3">
        <h3 class="h3-custom">
          <button class="btn btn-primary" @click="logout">Logout</button>
        </h3>
      </div>
    </div>
    <div class="row">

      <!-- <button @click="createBoard">Add Board</button> -->

      <div class="col-sm-2 col-sm-offset-5 thumbnail board-box" v-if="boards.length == 0">
        <div v-if="boardForm">
          <form class="form" @submit.prevent="createBoard">
            <div class="form-group">
              <label for="name">Board name</label>
              <input class="form-control" type="text" name="name" placeholder="Board name" v-model='newBoard.name' required>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <input class="form-control" type="text" name="description" v-model='newBoard.description' required>
            </div>
            <div class="form-group">
              <button type="submit">Create Board</button>
              <button @click="toggleBoardForm">Cancel</button>
            </div>
          </form>
        </div>
        <div @click="toggleBoardForm" v-else>
          <span class="glyphicon glyphicon-plus form-board-plus"></span>
        </div>
      </div>

      <div v-for="(board, i) in boards">

        <div class="col-sm-2 col-sm-offset-1 thumbnail board-box" v-if="i % 3 == 0">
          <div class="pull-right">
            <span @click="removeBoard(board)" class="glyphicon glyphicon-trash action-delete"></span>
          </div>
          <h3>
            <router-link :to="'/boards/'+board._id">{{board.name}}</router-link>
          </h3>
          <h4>{{board.description}}</h4>
        </div>

        <div class="col-sm-2 col-sm-offset-2 thumbnail board-box" v-else>
          <div class="pull-right">
            <span @click="removeBoard(board)" class="glyphicon glyphicon-trash"></span>
          </div>
          <h3>
            <router-link :to="'/boards/'+board._id">{{board.name}}</router-link>
          </h3>
          <h4>{{board.description}}</h4>
        </div>

        <div v-if="i == boards.length - 1">


          <div class="col-sm-2 col-sm-offset-1 thumbnail board-box" v-if="boards.length % 3 == 0">
            <div v-if="boardForm">
              <form class="form" @submit.prevent="createBoard">
                <div class="form-group">
                  <label for="name">Board name</label>
                  <input class="form-control" type="text" name="name" placeholder="Board name" v-model='newBoard.name' required>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <input class="form-control" type="text" name="description" v-model='newBoard.description' required>
                </div>
                <div class="form-group">
                  <button type="submit">Create Board</button>
                  <button @click="toggleBoardForm">Cancel</button>
                </div>
              </form>
            </div>
            <div @click="toggleBoardForm" v-else>
              <span class="glyphicon glyphicon-plus form-board-plus"></span>
            </div>
          </div>

          <div class="col-sm-2 col-sm-offset-2 thumbnail board-box" v-else>
            <div v-if="boardForm">
              <form class="form" @submit.prevent="createBoard">
                <div class="form-group">
                  <label for="name">Board name</label>
                  <input class="form-control" type="text" name="name" placeholder="Board name" v-model='newBoard.name' required>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <input class="form-control" type="text" name="description" v-model='newBoard.description' required>
                </div>
                <div class="form-group">
                  <button type="submit">Create Board</button>
                  <button @click="toggleBoardForm">Cancel</button>
                </div>
              </form>
            </div>
            <div @click="toggleBoardForm" v-else>
              <span class="glyphicon glyphicon-plus form-board-plus"></span>
            </div>
          </div>

        </div>

      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'boards',
    data() {
      return {
        boardForm: false,
        newBoard: {
          name: '',
          description: '',
          creatorId: ''
        }

      }
    },
    mounted() {
      this.$store.dispatch('getBoards')
    },
    computed: {
      boards() {
        return this.$store.state.boards
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      toggleBoardForm() {
        this.boardForm = !this.boardForm
      },
      createBoard() {
        this.newBoard.creatorId = this.user._id
        this.$store.dispatch('createBoard', this.newBoard)
        this.boardForm = false
        this.newBoard = {
          name: '',
          description: '',
          creatorId: '',
        }
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
  .top-bar {
    background-color: rgba(0, 255, 234, 1);
    margin-bottom: 25px;
  }

  .h3-custom {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .board-box {
    /* overflow: auto; */
    height: 250px;
    width: 250px;
  }

  .action {
    cursor: pointer;
    opacity: .7;
    transition: all .3s linear;
  }

  .action:hover {
    opacity: 1
  }

  .form-board-plus {
    font-size: 69px;
    line-height: 213px;
  }

  /* .jumbotron {
    height: 300px;
    border-top: 0;
    margin-top: 0;
  } */
</style>