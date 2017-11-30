<template>
  <div>
    <div>
      <button @click="logout">Logout</button>
    </div>
    <div>

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
      <!-- <button @click="createBoard">Add Board</button> -->
      <ul>
        <li v-for="board in boards">
          <router-link :to="'/boards/'+board._id">{{board.name}}</router-link>
          <span @click="removeBoard(board)" class="glyphicon glyphicon-trash"></span>
        </li>
      </ul>
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
  .jumbotron {
    height: 300px;
    border-top: 0;
    margin-top: 0;
  }

  .container {
    width: 100%;
  }
</style>