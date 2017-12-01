<template>
    <div>
<<<<<<< HEAD
        <h1>{{list.name}}</h1>
        <h6>{{list.description}}</h6>
        <span @click="removeList" class="glyphicon glyphicon-trash"></span>
        <div>
            <form class="form" @submit.prevent="submitTask">
                <div class="form-group">
                    <label for="name">Task Name</label>
                    <input class="form-control" type="text" name="name" placeholder="Task Name" v-model='newTask.name' required>
                </div>
                <div class="form-group">
                    <button type="submit">Add Task</button>
                </div>
            </form>
        </div>
=======
        <h3>{{name}}</h3>
        <h5>{{description}}</h5>
        <span @click="removeList(listId, board._id)" class="glyphicon glyphicon-trash"></span>
>>>>>>> 360f975ddd5aa530177e28063465feb8a7500a03
    </div>

</template>

<script>
    export default {
        name: 'lists',
        props: ["list"],
        data() {
            return {
                newTask: {
                    name: '',
                    listId: '',
                    boardId: ''
                }
            }
        },
        computed: {
            board() {
                return this.$store.state.activeBoard
            }

        },
        methods: {
            removeList() {
                this.$store.dispatch('removeList', this.list)
            },
            submitTask() {
                this.newTask.boardId = this.list.boardId
                this.newTask.listId = this.list._id
                this.$store.dispatch('submitTask', this.newTask)
                this.newTask = {
                    name: '',
                    listId: '',
                    boardId: ''
                }

            }
        },
        components: {

        }
    }
</script>

<style>
</style>