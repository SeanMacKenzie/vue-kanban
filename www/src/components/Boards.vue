<template>
  <div class="jumbotron">
    <div class="container">

      <button @click="logout" class="btn btn-default pull">Logout</button>
      <button @click="createBoard" class="btn btn-info">Add Board</button>
      <ul>
        <li v-for="board in boards">
          <router-link :to="'/boards/'+board._id">{{board.name}}</router-link>
          <span @click="removeBoard(board)">x</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'boards',
    mounted() {
      this.$store.dispatch('getBoards')
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      createBoard() {
        this.$store.dispatch('createBoard', {
          name: 'Testing board creation',
          description: 'blarg'
        })
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

<style scoped>
  .jumbotron {
    display: flex;
    height: 300px;
    border-top: 0;
    margin-top: 0
  }
</style>