<template>
    <div>
        <h4>{{list.name}}</h4>
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
        <div v-for="task in taskLists">
            <div class="thumbnail">
                <task :task="task" :list="list"></task>
            </div>
        </div>
    </div>

</template>

<script>
    import task from './task'
    export default {
        name: 'list',
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
        mounted() {
            var boardId = this.list.boardId
            var listId = this.list._id
            this.$store.dispatch('getTasks', { boardId, listId })
        },
        computed: {
            taskLists() {
                return this.$store.state.activeTasks[this.list._id]
            }
            // board() {
            //     return this.$store.state.activeBoard
            // }

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
            task
        }
    }
</script>

<style>
</style>