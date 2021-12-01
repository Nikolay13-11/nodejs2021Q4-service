// const json = require('koa-json');
const Koa = require('koa')

const bodyParser = require('koa-bodyparser');
const { PORT } = require('./common/config');

const app = new Koa()
const UserRotes = require('./resources/users/user.router')

app.use(bodyParser())
// app.use(json());

app.use(UserRotes.routes())
.use(UserRotes.allowedMethods())

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`))

