<template>
    <div>
        <h3>{{name}}</h3>
        <h5>{{description}}</h5>
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