<template>
    <div>
<<<<<<< HEAD
        <h1>{{name}}</h1>
        <h6>{{description}}</h6>
        <span @click="removeList(listId, board._id)" class="glyphicon glyphicon-trash"></span>
=======
        <h2>{{name}}</h2>
        <h5>{{description}}</h5>
>>>>>>> a450d594830eb23aba0ae48279ed8ec146aecb2b
    </div>

</template>

<script>
    export default {
        name: 'lists',
        props: ["name", "description", "listId"],
        data() {
            return {}
        },
        computed: {
            board() {
                return this.$store.state.activeBoard
            }

        },
        methods: {
            removeList(listId, boardId) {
                this.$store.dispatch('removeList', { listId, boardId })
            }
        },
        components: {

        }
    }
</script>

<style>
</style>