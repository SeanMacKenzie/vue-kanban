<template>
    <div>

        <!-- <div class="pull-right">
            <span @click="removeList" class="glyphicon glyphicon-trash"></span>
        </div> -->


        <!-- <div class="panel-heading">
                <h4>{{list.name}}</h4>
            </div> -->
        <!-- <h6>{{list.description}}</h6> -->

        <div class="add-task-div">
            <div v-if="!taskForm">
                <button @click="toggleTaskForm" class="btn btn-primary">Add task</button>
            </div>
            <div v-else>
                <button @click="toggleTaskForm" class="btn btn-primary">Cancel</button>
            </div>
            <div v-if="taskForm" class="task-form thumbnail">
                <form class="form" @submit.prevent="submitTask">
                    <div class="form-group">
                        <label for="name">Task Name</label>
                        <input class="form-control" type="text" name="name" placeholder="Task Name" v-model='newTask.name' required>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Add Task</button>
                    </div>
                </form>
            </div>
        </div>

        <div v-for="task in taskLists">
            <div class="thumbnail task-div">
                <div class="pull-right">
                    <span @click="removeTask(task._id)" class="glyphicon glyphicon-trash trash-icon action-delete"></span>
                </div>
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
                taskForm: false,
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
            // removeListremoveList() {
            //     this.$store.dispatch('removeList', this.list)
            // },
            toggleTaskForm() {
                this.taskForm = !this.taskForm
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
                this.taskForm = !this.taskForm
            },
            removeTask(taskId) {
                var listId = this.list._id
                var boardId = this.list.boardId
                this.$store.dispatch('removeTask', { listId, boardId, taskId })
            }
        },
        components: {
            task
        }
    }
</script>

<style>
    .task-div{
        background-color: rgb(108, 108, 108)
    }
    .trash-icon{
        color: white;
    }
    .action-delete {
        cursor: pointer;
        opacity: .7;
        transition: all .3s linear;
    }

    .action-delete:hover {
        opacity: 1;
        color: red;
    }
</style>