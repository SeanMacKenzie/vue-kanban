<template>
  <div class="boards-page container-fluid">
    <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
        <h3>{{user.name}}'s Boards</h3>
      </div>
      <div class="top-bar col-sm-1 col-sm-offset-3">
        <div class="pull-right">
          <button @click="logout">Logout</button>
        </div>
      </div>
    </div>
    <div class="row">

      <!-- <button @click="createBoard">Add Board</button> -->

      <div class="col-sm-2 col-sm-offset-5 thumbnail" v-if="boards.length == 0">
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
          </div>
        </form>
      </div>

      <div v-for="(board, i) in boards">

        <div class="col-sm-2 thumbnail col-sm-offset-1" v-if="i % 3 == 0">
          <router-link :to="'/boards/'+board._id">{{board.name}}</router-link>
          <span @click="removeBoard(board)" class="glyphicon glyphicon-trash"></span>
          <p>{{board.description}}</p>
        </div>

        <div class="col-sm-2 col-sm-offset-2 thumbnail" v-else>
          <router-link :to="'/boards/'+board._id">{{board.name}}</router-link>
          <span @click="removeBoard(board)" class="glyphicon glyphicon-trash"></span>
          <p>{{board.description}}</p>
        </div>

        <div v-if="i == boards.length - 1">


          <div class="col-sm-2 col-sm-offset-1 thumbnail" v-if="boards.length % 3 == 0">
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
              </div>
            </form>
          </div>

          <div class="col-sm-2 col-sm-offset-2 thumbnail" v-else>
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
              </div>
            </form>
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
      createBoard() {
        this.newBoard.creatorId = this.user._id
        this.$store.dispatch('createBoard', this.newBoard)
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
  /* .jumbotron {
    height: 300px;
    border-top: 0;
    margin-top: 0;
  } */
</style>