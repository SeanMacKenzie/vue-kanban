<template>
  <div class="container"> 
    <div class="row">
      <div class="col-m-6">{{board.name}}</div>
      <div class="col-m-6">{{board.description}}</div>
      <div class="col-m-6">{{board.created}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'board',
  mounted(){
    this.$store.dispatch('getBoard',this.$route.params.id)
  },
  computed:{
    board(){
      return this.$store.state.activeBoard
    }
  }
}
</script>

<style scoped>

</style>
