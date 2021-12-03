const bodyParser = require('koa-bodyparser');

const Koa = require('koa')

const app = new Koa()

app.use(bodyParser())

const UserRotes = require('./resources/users/user.router')
const BoardsRotes = require('./resources/boards/boards.router')
const TasksRotes = require('./resources/tasks/task.router')


app.use(UserRotes.routes())
.use(UserRotes.allowedMethods())
app.use(BoardsRotes.routes())
.use(BoardsRotes.allowedMethods())
app.use(TasksRotes.routes())
.use(TasksRotes.allowedMethods())

module.exports = app;
