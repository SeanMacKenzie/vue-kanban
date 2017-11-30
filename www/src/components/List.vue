<template>
    <div>
        <h1>{{name}}</h1>
        <h6>{{description}}</h6>
        <span @click="removeList(listId, board._id)" class="glyphicon glyphicon-trash"></span>
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