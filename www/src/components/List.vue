<template>
    <div>
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