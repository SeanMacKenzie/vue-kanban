webpackJsonp([1],[,,,,,,,,,,,,,function(t,s,e){"use strict";var o=e(7),a=e.n(o),i=e(102),n=e(90),r=e.n(n),c=e(89),l=e.n(c),d=e(92),m=e.n(d);a.a.use(i.a),s.a=new i.a({routes:[{path:"/",name:"Boards",component:r.a},{path:"/boards/:id",name:"Board",component:l.a},{path:"/login",name:"Login",component:m.a}]})},,,,,,,,,,,,,,,,,,,,function(t,s,e){"use strict";var o=e(38),a=e.n(o),i=e(7),n=e.n(i),r=e(104),c=e(13),l=(window.location.host.indexOf("localhost"),a.a.create({baseURL:"/api/",timeout:2e3,withCredentials:!0})),d=a.a.create({baseURL:"/",timeout:2e3,withCredentials:!0});n.a.use(r.a);var m=new r.a.Store({state:{boards:[],activeBoard:{},activeLists:[],activeTasks:{},activeComments:{},error:{},user:{}},mutations:{setUser:function(t,s){t.user=s},setBoards:function(t,s){t.boards=s},setLists:function(t,s){t.activeLists=s},setTasks:function(t,s){n.a.set(t.activeTasks,s.listId,s.tasks),console.log(t.activeTasks)},setComments:function(t,s){n.a.set(t.activeComments,s.taskId,s.comments),console.log("Active comments: ",t.activeComments)},handleError:function(t,s){t.error=s},setActiveBoard:function(t,s){t.activeBoard=s}},actions:{submitLogin:function(t,s){var e=t.commit;t.dispatch;d.post("login",s).then(function(t){e("setUser",t.data.data),c.a.push({name:"Boards"})}).catch(function(t){e("handleError",t)})},logout:function(t){var s=t.commit;t.dispatch;d.delete("logout").then(function(t){s("setUser",{}),c.a.push({name:"Login"})}).catch(function(t){s("handleError",t)})},authenticate:function(t){var s=t.commit;t.dispatch;d("authenticate").then(function(t){s("setUser",t.data.data),c.a.push({name:"Boards"})}).catch(function(){c.a.push({name:"Login"})})},submitRegister:function(t,s){var e=t.commit;t.dispatch;d.post("register",s).then(function(t){e("setUser",t.data.data),c.a.push({name:"Boards"})}).catch(function(t){e("handleError",t)})},getBoards:function(t){var s=t.commit;t.dispatch;l("userboards").then(function(t){s("setBoards",t.data.data)}).catch(function(t){s("handleError",t)})},getBoard:function(t,s){var e=t.commit;t.dispatch;l("boards/"+s).then(function(t){e("setActiveBoard",t.data.data)}).catch(function(t){e("handleError",t)})},createBoard:function(t,s){var e=t.commit,o=t.dispatch;l.post("boards/",s).then(function(t){o("getBoards")}).catch(function(t){e("handleError",t)})},removeBoard:function(t,s){var e=t.commit,o=t.dispatch;l.delete("boards/"+s._id).then(function(t){o("getBoards")}).catch(function(t){e("handleError",t)})},getLists:function(t,s){var e=t.commit;t.dispatch;l("boards/"+s+"/lists").then(function(t){e("setLists",t.data.data)}).catch(function(t){e("handleError",t)})},submitList:function(t,s){var e=t.commit,o=t.dispatch;l.post("lists/",s).then(function(t){o("getLists",s.boardId)}).catch(function(t){e("handleError",t)})},removeList:function(t,s){var e=t.commit,o=t.dispatch;l.delete("lists/"+s._id).then(function(t){o("getLists",s.boardId)}).catch(function(t){e("handleError",t)})},getTasks:function(t,s){var e=t.commit;t.dispatch;console.log("getting tasks from: ",s.listId),l("boards/"+s.boardId+"/lists/"+s.listId+"/tasks").then(function(t){e("setTasks",{listId:s.listId,tasks:t.data.data})}).catch(function(t){e("handleError",t)})},submitTask:function(t,s){var e=t.commit,o=t.dispatch;l.post("tasks/",s).then(function(t){o("getTasks",s)}).catch(function(t){e("handleError",t)})},moveTask:function(t,s){var e=t.commit,o=t.dispatch,a={listId:s.listId};l.put("tasks/"+s.taskId,a).then(function(t){o("getTasks",{listId:s.listId,boardId:s.boardId}),o("getTasks",{listId:s.oldList,boardId:s.boardId})}).catch(function(t){e("handleError",t)})},removeTask:function(t,s){var e=t.commit,o=t.dispatch;l.delete("tasks/"+s.taskId).then(function(t){o("getTasks",s)}).catch(function(t){e("handleError",t)})},getComments:function(t,s){var e=t.commit;t.dispatch;console.log("getting comments from: ",s.taskId),l("boards/"+s.boardId+"/lists/"+s.listId+"/tasks/"+s.taskId+"/comments").then(function(t){console.log("inside getComments:",t),e("setComments",{taskId:s.taskId,comments:t.data.data})}).catch(function(t){e("handleError",t)})},submitComment:function(t,s){var e=t.commit,o=t.dispatch;l.post("comments/",s).then(function(t){o("getComments",s)}).catch(function(t){e("handleError",t)})},removeComment:function(t,s){var e=t.commit,o=t.dispatch;l.delete("comments/"+s.commentId).then(function(t){o("getComments",s)}).catch(function(t){e("handleError",t)})},handleError:function(t,s){var e=t.commit;t.dispatch;e("handleError",s)}}});s.a=m},,function(t,s,e){e(76);var o=e(3)(e(56),e(96),null,null);t.exports=o.exports},,,,,,,,,,,,,,,,,,,,,function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=e(91),a=e.n(o);s.default={name:"app",data:function(){return{}},mounted:function(){this.$store.dispatch("authenticate")},components:{Error:a.a},methods:{},computed:{}}},function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=e(93),a=e.n(o);s.default={name:"board",data:function(){return{listForm:!1,newList:{name:"",description:"",boardId:""}}},mounted:function(){this.$store.dispatch("getBoard",this.$route.params.id),this.$store.dispatch("getLists",this.$route.params.id)},methods:{toggleListForm:function(){this.listForm=!this.listForm},submitList:function(){this.newList.boardId=this.board._id,this.$store.dispatch("submitList",this.newList),this.listForm=!1,this.newList={name:"",description:"",boardId:""}},removeList:function(t){this.$store.dispatch("removeList",t)},logout:function(){this.$store.dispatch("logout")}},computed:{board:function(){return this.$store.state.activeBoard},lists:function(){return this.$store.state.activeLists}},components:{list:a.a}}},function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={name:"boards",data:function(){return{boardForm:!1,newBoard:{name:"",description:"",creatorId:""}}},mounted:function(){this.$store.dispatch("getBoards")},computed:{boards:function(){return this.$store.state.boards},user:function(){return this.$store.state.user}},methods:{toggleBoardForm:function(){this.boardForm=!this.boardForm},createBoard:function(){this.newBoard.creatorId=this.user._id,this.$store.dispatch("createBoard",this.newBoard),this.boardForm=!1,this.newBoard={name:"",description:"",creatorId:""}},removeBoard:function(t){this.$store.dispatch("removeBoard",t)},logout:function(){this.$store.dispatch("logout")}}}},function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={name:"error",computed:{error:function(){return this.$store.state.error}}}},function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={data:function(){return{loginForm:!0,login:{email:"",password:""},register:{name:"",email:"",password:""}}},methods:{toggleLoginForm:function(){this.loginForm=!this.loginForm},submitLogin:function(){this.$store.dispatch("submitLogin",this.login),this.login={email:"",password:""}},submitRegister:function(){this.$store.dispatch("submitRegister",this.register),this.register={name:"",email:"",password:""}}},computed:{error:function(){return this.$store.state.error.message}}}},function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=e(94),a=e.n(o);s.default={name:"list",props:["list"],data:function(){return{taskForm:!1,newTask:{name:"",listId:"",boardId:""}}},mounted:function(){var t=this.list.boardId,s=this.list._id;this.$store.dispatch("getTasks",{boardId:t,listId:s})},computed:{taskLists:function(){return this.$store.state.activeTasks[this.list._id]}},methods:{toggleTaskForm:function(){this.taskForm=!this.taskForm},submitTask:function(){this.newTask.boardId=this.list.boardId,this.newTask.listId=this.list._id,this.$store.dispatch("submitTask",this.newTask),this.newTask={name:"",listId:"",boardId:""},this.taskForm=!this.taskForm},removeTask:function(t){var s=this.list._id,e=this.list.boardId;this.$store.dispatch("removeTask",{listId:s,boardId:e,taskId:t})}},components:{task:a.a}}},function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={name:"task",props:["task","list"],data:function(){return{moveForm:!1,commentForm:!1,listSelection:"",newComment:{comment:"",taskId:"",listId:"",boardId:""}}},mounted:function(){var t=this.list.boardId,s=this.list._id,e=this.task._id;this.$store.dispatch("getComments",{boardId:t,listId:s,taskId:e})},computed:{lists:function(){return this.$store.state.activeLists},commentLists:function(){return this.$store.state.activeComments[this.task._id]}},methods:{removeTask:function(){var t=this.task._id,s=this.task.listId,e=this.list.boardId;this.$store.dispatch("removeTask",{listId:s,boardId:e,taskId:t})},toggleMoveForm:function(){this.moveForm=!this.moveForm},toggleCommentForm:function(){this.commentForm=!this.commentForm},moveTask:function(){var t=this.list._id,s=this.listSelection,e=this.task._id,o=this.list.boardId;this.$store.dispatch("moveTask",{listId:s,taskId:e,boardId:o,oldList:t}),this.listSelection="",this.toggleMoveForm()},submitComment:function(){this.newComment.boardId=this.list.boardId,this.newComment.listId=this.task.listId,this.newComment.taskId=this.task._id,this.$store.dispatch("submitComment",this.newComment),this.newComment={comment:"",taskId:"",listId:"",boardId:""}},removeComment:function(t){var s=this.task._id,e=this.task.listId,o=this.list.boardId;this.$store.dispatch("removeComment",{listId:e,boardId:o,taskId:s,commentId:t})}},components:{}}},function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=e(7),a=e.n(o),i=e(35),n=e.n(i),r=e(13),c=e(34),l=e.n(c),d=e(33),m=l()("//");m.on("CONNECTED",function(t){console.log(t),m.emit("update",{data:"blarg",boardId:"3289748320"})}),new a.a({el:"#app",store:d.a,router:r.a,template:"<App/>",components:{App:n.a}})},,,,,,,,,,,,function(t,s){},function(t,s){},function(t,s){},function(t,s){},function(t,s){},function(t,s){},function(t,s){},,,,,,,,function(t,s,e){e(79);var o=e(3)(e(57),e(99),null,null);t.exports=o.exports},function(t,s,e){e(75);var o=e(3)(e(58),e(95),null,null);t.exports=o.exports},function(t,s,e){e(78);var o=e(3)(e(59),e(98),"data-v-49c58c80",null);t.exports=o.exports},function(t,s,e){e(80);var o=e(3)(e(60),e(100),null,null);t.exports=o.exports},function(t,s,e){e(77);var o=e(3)(e(61),e(97),null,null);t.exports=o.exports},function(t,s,e){e(81);var o=e(3)(e(62),e(101),null,null);t.exports=o.exports},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"boards-page container-fluid"},[e("div",{staticClass:"row top-bar"},[e("div",{staticClass:"col-sm-4 col-sm-offset-4"},[e("h3",{staticClass:"h3-custom"},[t._v(t._s(t.user.name)+"'s Boards")])]),t._v(" "),e("div",{staticClass:"col-sm-1 col-sm-offset-3"},[e("h3",{staticClass:"h3-custom"},[e("button",{staticClass:"btn btn-primary",on:{click:t.logout}},[t._v("Logout")])])])]),t._v(" "),e("div",{staticClass:"row"},[0==t.boards.length?e("div",{staticClass:"col-sm-2 col-sm-offset-5 thumbnail board-box"},[t.boardForm?e("div",[e("form",{staticClass:"form",on:{submit:function(s){s.preventDefault(),t.createBoard(s)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"name"}},[t._v("Board name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.name,expression:"newBoard.name"}],staticClass:"form-control",attrs:{type:"text",name:"name",placeholder:"Board name",required:""},domProps:{value:t.newBoard.name},on:{input:function(s){s.target.composing||(t.newBoard.name=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"description"}},[t._v("Description")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.description,expression:"newBoard.description"}],staticClass:"form-control",attrs:{type:"text",name:"description",required:""},domProps:{value:t.newBoard.description},on:{input:function(s){s.target.composing||(t.newBoard.description=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("button",{attrs:{type:"submit"}},[t._v("Create Board")]),t._v(" "),e("button",{on:{click:t.toggleBoardForm}},[t._v("Cancel")])])])]):e("div",{on:{click:t.toggleBoardForm}},[e("span",{staticClass:"glyphicon glyphicon-plus form-board-plus"})])]):t._e(),t._v(" "),t._l(t.boards,function(s,o){return e("div",[o%3==0?e("div",{staticClass:"col-sm-2 col-sm-offset-1 thumbnail board-box"},[e("div",{staticClass:"pull-right"},[e("span",{staticClass:"glyphicon glyphicon-trash action-delete",on:{click:function(e){t.removeBoard(s)}}})]),t._v(" "),e("h3",[e("router-link",{attrs:{to:"/boards/"+s._id}},[t._v(t._s(s.name))])],1),t._v(" "),e("h4",[t._v(t._s(s.description))])]):e("div",{staticClass:"col-sm-2 col-sm-offset-2 thumbnail board-box"},[e("div",{staticClass:"pull-right"},[e("span",{staticClass:"glyphicon glyphicon-trash",on:{click:function(e){t.removeBoard(s)}}})]),t._v(" "),e("h3",[e("router-link",{attrs:{to:"/boards/"+s._id}},[t._v(t._s(s.name))])],1),t._v(" "),e("h4",[t._v(t._s(s.description))])]),t._v(" "),o==t.boards.length-1?e("div",[t.boards.length%3==0?e("div",{staticClass:"col-sm-2 col-sm-offset-1 thumbnail board-box"},[t.boardForm?e("div",[e("form",{staticClass:"form",on:{submit:function(s){s.preventDefault(),t.createBoard(s)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"name"}},[t._v("Board name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.name,expression:"newBoard.name"}],staticClass:"form-control",attrs:{type:"text",name:"name",placeholder:"Board name",required:""},domProps:{value:t.newBoard.name},on:{input:function(s){s.target.composing||(t.newBoard.name=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"description"}},[t._v("Description")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.description,expression:"newBoard.description"}],staticClass:"form-control",attrs:{type:"text",name:"description",required:""},domProps:{value:t.newBoard.description},on:{input:function(s){s.target.composing||(t.newBoard.description=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("button",{attrs:{type:"submit"}},[t._v("Create Board")]),t._v(" "),e("button",{on:{click:t.toggleBoardForm}},[t._v("Cancel")])])])]):e("div",{on:{click:t.toggleBoardForm}},[e("span",{staticClass:"glyphicon glyphicon-plus form-board-plus"})])]):e("div",{staticClass:"col-sm-2 col-sm-offset-2 thumbnail board-box"},[t.boardForm?e("div",[e("form",{staticClass:"form",on:{submit:function(s){s.preventDefault(),t.createBoard(s)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"name"}},[t._v("Board name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.name,expression:"newBoard.name"}],staticClass:"form-control",attrs:{type:"text",name:"name",placeholder:"Board name",required:""},domProps:{value:t.newBoard.name},on:{input:function(s){s.target.composing||(t.newBoard.name=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"description"}},[t._v("Description")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newBoard.description,expression:"newBoard.description"}],staticClass:"form-control",attrs:{type:"text",name:"description",required:""},domProps:{value:t.newBoard.description},on:{input:function(s){s.target.composing||(t.newBoard.description=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("button",{attrs:{type:"submit"}},[t._v("Create Board")]),t._v(" "),e("button",{on:{click:t.toggleBoardForm}},[t._v("Cancel")])])])]):e("div",{on:{click:t.toggleBoardForm}},[e("span",{staticClass:"glyphicon glyphicon-plus form-board-plus"})])])]):t._e()])})],2)])},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"add-task-div"},[t.taskForm?e("div",[e("button",{staticClass:"btn btn-primary",on:{click:t.toggleTaskForm}},[t._v("Cancel")])]):e("div",[e("button",{staticClass:"btn btn-primary",on:{click:t.toggleTaskForm}},[t._v("Add task")])]),t._v(" "),t.taskForm?e("div",{staticClass:"task-form thumbnail"},[e("form",{staticClass:"form",on:{submit:function(s){s.preventDefault(),t.submitTask(s)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"name"}},[t._v("Task Name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newTask.name,expression:"newTask.name"}],staticClass:"form-control",attrs:{type:"text",name:"name",placeholder:"Task Name",required:""},domProps:{value:t.newTask.name},on:{input:function(s){s.target.composing||(t.newTask.name=s.target.value)}}})]),t._v(" "),t._m(0)])]):t._e()]),t._v(" "),t._l(t.taskLists,function(s){return e("div",[e("div",{staticClass:"thumbnail task-div"},[e("div",{staticClass:"pull-right"},[e("span",{staticClass:"glyphicon glyphicon-trash trash-icon action-delete",on:{click:function(e){t.removeTask(s._id)}}})]),t._v(" "),e("task",{attrs:{task:s,list:t.list}})],1)])})],2)},staticRenderFns:[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[t._v("Add Task")])])}]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return t.error.message?e("div",[t._v(" \n  Error: "+t._s(t.error)+"\n")]):t._e()},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"board-page"},[e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row top-bar"},[e("div",{staticClass:"col-sm-1"},[e("h3",{staticClass:"h3-custom"},[e("router-link",{attrs:{to:"/"}},[e("button",{staticClass:"btn btn-primary"},[e("span",{staticClass:"glyphicon glyphicon-arrow-left"}),t._v(" Back to Boards")])])],1)]),t._v(" "),e("div",{staticClass:"col-sm-1 col-sm-offset-10"},[e("h3",{staticClass:"h3-custom"},[e("button",{staticClass:"btn btn-primary",on:{click:t.logout}},[t._v("Logout")])])])]),t._v(" "),e("div",{staticClass:"text-center"},[e("h1",[t._v(t._s(t.board.name))]),t._v(" "),e("h3",[t._v(t._s(t.board.description))])]),t._v(" "),e("div",{staticClass:"row text-center list-row"},[e("div",{staticClass:"list-wrapper"},[t._l(t.lists,function(s,o){return e("div",{staticClass:"list-div"},[e("div",{staticClass:"panel panel-default list-panel"},[e("div",{staticClass:"panel-heading"},[e("div",{staticClass:"pull-right"},[e("span",{staticClass:"glyphicon glyphicon-trash action-delete",on:{click:function(e){t.removeList(s)}}})]),t._v("\n              "+t._s(s.name)+"\n            ")]),t._v(" "),e("div",{staticClass:"panel-body"},[e("list",{attrs:{list:s}})],1)])])}),t._v(" "),e("div",{staticClass:"add-list-button list-div"},[e("div",{staticClass:"panel panel-default list-panel"},[e("div",{staticClass:"panel-body"},[t.listForm?e("div",{staticClass:"listForm"},[e("form",{staticClass:"form",on:{submit:function(s){s.preventDefault(),t.submitList(s)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"name"}},[t._v("List name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newList.name,expression:"newList.name"}],staticClass:"form-control",attrs:{type:"text",name:"name",placeholder:"List name",required:""},domProps:{value:t.newList.name},on:{input:function(s){s.target.composing||(t.newList.name=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"description"}},[t._v("Description")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newList.description,expression:"newList.description"}],staticClass:"form-control",attrs:{type:"text",name:"description"},domProps:{value:t.newList.description},on:{input:function(s){s.target.composing||(t.newList.description=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[t._v("Create list")]),t._v(" "),e("button",{staticClass:"btn btn-primary",on:{click:t.toggleListForm}},[t._v("Cancel")])])])]):e("div",[e("button",{staticClass:"form-list-plus",on:{click:t.toggleListForm}},[t._v("+")])])])])])],2)])])])},staticRenderFns:[]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"login container-fluid"},[t.error?e("h5",{staticClass:"text-danger"},[e("b",[t._v(t._s(t.error))])]):t._e(),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"login-box thumbnail col-sm-4 col-sm-offset-4"},[e("h1",[t._v("Kanban!")]),t._v(" "),e("p",[t._v("please login to continue:")]),t._v(" "),e("div",{staticClass:"form-box row"},[e("div",{staticClass:"form-col col-sm-8 col-sm-offset-2"},[t.loginForm?e("div",{staticClass:"login"},[e("form",{staticClass:"form",on:{submit:function(s){s.preventDefault(),t.submitLogin(s)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.login.email,expression:"login.email"}],staticClass:"form-control",attrs:{type:"email",name:"email",placeholder:"your@email.com",required:""},domProps:{value:t.login.email},on:{input:function(s){s.target.composing||(t.login.email=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"password"}},[t._v("Password")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.login.password,expression:"login.password"}],staticClass:"form-control",attrs:{type:"password",name:"password",required:""},domProps:{value:t.login.password},on:{input:function(s){s.target.composing||(t.login.password=s.target.value)}}})]),t._v(" "),t._m(0)])]):e("div",{staticClass:"register"},[e("form",{staticClass:"form",on:{submit:function(s){s.preventDefault(),t.submitRegister(s)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"name"}},[t._v("Name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.register.name,expression:"register.name"}],staticClass:"form-control",attrs:{type:"text",name:"name",placeholder:"Name",required:""},domProps:{value:t.register.name},on:{input:function(s){s.target.composing||(t.register.name=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"email"}},[t._v("Email")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.register.email,expression:"register.email"}],staticClass:"form-control",attrs:{type:"email",name:"email",placeholder:"your@email.com",required:""},domProps:{value:t.register.email},on:{input:function(s){s.target.composing||(t.register.email=s.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"password"}},[t._v("Password")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.register.password,expression:"register.password"}],staticClass:"form-control",attrs:{type:"password",name:"password",required:""},domProps:{value:t.register.password},on:{input:function(s){s.target.composing||(t.register.password=s.target.value)}}})]),t._v(" "),t._m(1)])])])]),t._v(" "),t.loginForm?e("p",{staticClass:"action",on:{click:t.toggleLoginForm}},[t._v("Not a user? Click here to register")]):e("p",{staticClass:"action",on:{click:t.toggleLoginForm}},[t._v("Already a user? Click here to login")])])])])},staticRenderFns:[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"form-group"},[e("button",{attrs:{type:"submit"}},[t._v("Login")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"form-group"},[e("button",{attrs:{type:"submit"}},[t._v("Register")])])}]}},function(t,s){t.exports={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"task-div"},[e("h5",{staticClass:"task-title"},[t._v(t._s(t.task.name))]),t._v(" "),(t.commentForm,e("div",{staticClass:"task-buttons"},[e("button",{staticClass:"glyphicon glyphicon-comment",on:{click:t.toggleCommentForm}})])),t._v(" "),(t.moveForm,e("div",{staticClass:"task-buttons"},[e("button",{staticClass:"glyphicon glyphicon-move",on:{click:t.toggleMoveForm}})])),t._v(" "),t.moveForm?e("div",[e("form",{staticClass:"form",attrs:{name:"taskmover"},on:{submit:function(s){s.preventDefault(),t.moveTask(s)}}},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.listSelection,expression:"listSelection"}],staticClass:"select",on:{change:function(s){var e=Array.prototype.filter.call(s.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.listSelection=s.target.multiple?e:e[0]}}},[e("option",{attrs:{disabled:"",selected:"",value:""}},[t._v("Select List")]),t._v(" "),t._l(t.lists,function(s){return e("option",{domProps:{value:s._id}},[t._v(t._s(s.name))])})],2),t._v(" "),e("button",{attrs:{type:"submit"}},[t._v("Move Task")])])]):t._e()]),t._v(" "),t.commentForm?e("div",{staticClass:"comment-box"},[e("ul",t._l(t.commentLists,function(s){return e("li",{staticClass:"comment-div"},[e("div",{staticClass:"pull-right"},[e("span",{staticClass:"glyphicon glyphicon-trash action-delete",on:{click:function(e){t.removeComment(s._id)}}})]),t._v(" "),e("p",[t._v(t._s(s.comment)+"\n                ")])])})),t._v(" "),e("form",{staticClass:"form",on:{submit:function(s){s.preventDefault(),t.submitComment(s)}}},[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"comment"}},[t._v("Comment")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newComment.comment,expression:"newComment.comment"}],staticClass:"form-control",attrs:{type:"text",name:"comment",placeholder:"Comment",required:""},domProps:{value:t.newComment.comment},on:{input:function(s){s.target.composing||(t.newComment.comment=s.target.value)}}})]),t._v(" "),t._m(0)])]):t._e()])},staticRenderFns:[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"form-group"},[e("button",{attrs:{type:"submit"}},[t._v("Add Comment")])])}]}},,,,,,function(t,s){}],[63]);
//# sourceMappingURL=app.e8b99bc772a574ec8e01.js.map