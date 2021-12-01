const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const { PORT } = require('./common/config');

const app = new Koa()
const HomeRotes = require('./routes/home.router')

app.use(bodyParser())

app.use(HomeRotes.routes())
.use(HomeRotes.allowedMethods())

app.listen(PORT)
console.log(`App is running on http://localhost:${PORT}`)



// app.listen(PORT, () =>
//   
// );


// const start = async() => {
//   try{
//     await fastify.listen(PORT)
//   } catch (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// }

// start()

// fastify.get("/", async() => ('ddddd'))