// const path = require('path');
// const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');
const bodyParser = require('koa-bodyparser');
// const json = require('koa-json');
const Koa = require('koa')

const app = new Koa()

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(bodyParser())
// app.use(json())

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
