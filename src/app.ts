const bodyParser = require('koa-bodyparser');
const Koa = require('koa')

export const app = new Koa()

app.use(bodyParser())

import { routerUser } from './resources/users/user.router'
const BoardsRotes = require('./resources/boards/boards.router')
const TasksRotes = require('./resources/tasks/task.router')

app.use(routerUser.routes())
.use(routerUser.allowedMethods())
app.use(BoardsRotes.routes())
.use(BoardsRotes.allowedMethods())
app.use(TasksRotes.routes())
.use(TasksRotes.allowedMethods())
