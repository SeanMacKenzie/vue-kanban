<template>
    <div>
        <div class="task-div">
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
        <div>
            <form class="form" @submit.prevent="submitComment">
                <div class="form-group">
                    <label for="comment">Comment</label>
                    <input class="form-control" type="text" name="comment" placeholder="Comment" v-model='newComment.comment' required>
                </div>
                <div class="form-group">
                    <button type="submit">Add Comment</button>
                </div>
            </form>
        </div>
        <div class="comment-div thumbnail" v-for="comment in commentLists">
            <h5>{{comment.comment}}
                <span @click="removeComment(comment._id)" class="glyphicon glyphicon-trash"></span>
            </h5>



        </div>



    </div>


</template>

<script>
    export default {
        name: 'task',
        props: ["task", "list"],
        data() {
            return {
                listSelection: '',
                newComment: {
                    comment: '',
                    taskId: '',
                    listId: '',
                    boardId: ''
                }
            }
        },
        mounted() {
            var boardId = this.list.boardId
            var listId = this.list._id
            var taskId = this.task._id
            this.$store.dispatch('getComments', { boardId, listId, taskId })
        },
        computed: {
            lists() {
                return this.$store.state.activeLists
            },
            commentLists() {
                return this.$store.state.activeComments[this.task._id]
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
            },
            submitComment() {
                this.newComment.boardId = this.list.boardId
                this.newComment.listId = this.task.listId
                this.newComment.taskId = this.task._id
                this.$store.dispatch('submitComment', this.newComment)
                this.newComment = {
                    comment: '',
                    taskId: '',
                    listId: '',
                    boardId: ''
                }
            },
            removeComment(commentId) {
                var taskId = this.task._id
                var listId = this.task.listId
                var boardId = this.list.boardId
                this.$store.dispatch('removeComment', { listId, boardId, taskId, commentId })
            },
        },
        components: {

        }


    }
</script>

<style>
</style>