<template>
    <div>
        <div class="task-div">
            <!-- <div class="pull-right">
                <span @click="removeTask" class="glyphicon glyphicon-trash"></span>
            </div> -->
            <h5 class="task-title">{{task.name}}</h5>

            <div v-if="commentForm" class="task-buttons">
                <button @click="toggleCommentForm" class="glyphicon glyphicon-comment"></button>
            </div>
            <div v-else class="task-buttons">
                <button @click="toggleCommentForm" class="glyphicon glyphicon-comment"></button>
            </div>
            <div v-if="moveForm" class="task-buttons">
                <button class="glyphicon glyphicon-move" @click="toggleMoveForm"></button>
            </div>
            <div v-else class="task-buttons">
                <button class="glyphicon glyphicon-move" @click="toggleMoveForm"></button>
            </div>

            <div v-if="moveForm">
                <form name="taskmover" class="form" @submit.prevent="moveTask">
                    <select class="select" v-model="listSelection">
                        <option disabled selected value="">Select List</option>
                        <option v-for="list in lists" :value="list._id">{{list.name}}</option>
                    </select>
                    <button type="submit">Move Task</button>
                </form>
            </div>
        </div>


        <div class="comment-box" v-if="commentForm">
            <ul>
                <li class="comment-div" v-for="comment in commentLists">
                    <div class="pull-right">
                        <span @click="removeComment(comment._id)" class="glyphicon glyphicon-trash action-delete"></span>
                    </div>
                    <p>{{comment.comment}}
                    </p>
                </li>
            </ul>
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



    </div>


</template>

<script>
    export default {
        name: 'task',
        props: ["task", "list"],
        data() {
            return {
                moveForm: false,
                commentForm: false,
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
            toggleMoveForm() {
                this.moveForm = !this.moveForm
            },
            toggleCommentForm() {
                this.commentForm = !this.commentForm
            },
            moveTask() {
                var oldList = this.list._id
                var listId = this.listSelection
                var taskId = this.task._id
                var boardId = this.list.boardId
                this.$store.dispatch('moveTask', { listId, taskId, boardId, oldList })
                this.listSelection = ''
                this.toggleMoveForm()
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
    .comment-div p {
        /* overflow-wrap: break-word !important; */
        word-wrap: break-all;
        white-space: normal;
    }

    .task-title {
        font-weight: bold;
        color: rgb(255, 255, 255);
    }

    .task-buttons {
        display: inline-block;
    }

    .comment-box {
        background-color: rgba(225, 225, 225, 1)
    }
</style>