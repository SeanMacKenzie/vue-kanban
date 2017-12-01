<template>
    <div>


        <h5>{{task.name}}
            <span @click="removeTask" class="glyphicon glyphicon-trash"></span>
        </h5>
        <select>
            <option v-for="list in lists" value="list._id">{{list.name}}</option>
        </select>


        <!-- <div>
            <form class="form" @submit.prevent="submitTask">
                <div class="form-group">
                    <label for="name">Task Name</label>
                    <input class="form-control" type="text" name="name" placeholder="Task Name" v-model='newTask.name' required>
                </div>
                <div class="form-group">
                    <button type="submit">Add Task</button>
                </div>
            </form>
        </div> -->
    </div>


</template>

<script>
    export default {
        name: 'task',
        props: ["task"],
        data() {
            return {

            }
        },
        computed: {
            lists() {
                return this.$store.state.activeLists
            }
        },
        methods: {
            removeTask() {
                this.$store.dispatch('removeTask', this.task)
            }
        },
        components: {

        }


    }
</script>

<style>
</style>