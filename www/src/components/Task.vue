<template>
    <div>


        <h5>{{task.name}}
            <span @click="removeTask" class="glyphicon glyphicon-trash"></span>
        </h5>
        <form name="taskmover" class="form" @submit.prevent="moveTask">
            <select class="select" v-model="listSelection">
                <option disabled selected value="">Select List</option>
                <option v-for="list in lists" :value="list._id">{{list.name}}</option>
            </select>
            <button type="submit">Move Task</button>
        </form>



    </div>


</template>

<script>
    export default {
        name: 'task',
        props: ["task", "list"],
        data() {
            return {
                listSelection: ''
            }
        },
        computed: {
            lists() {
                return this.$store.state.activeLists
            }
        },
        methods: {
            removeTask() {
                var taskId = this.task._id
                var listId = this.task.listId
                var boardId = this.list.boardId
                this.$store.dispatch('removeTask', { listId, boardId, taskId })
            },
            moveTask() {
                var oldList = this.list._id
                var listId = this.listSelection
                var taskId = this.task._id
                var boardId = this.list.boardId
                this.$store.dispatch('moveTask', { listId, taskId, boardId, oldList })
                this.listSelection = ''
            }
        },
        components: {

        }


    }
</script>

<style>
</style>