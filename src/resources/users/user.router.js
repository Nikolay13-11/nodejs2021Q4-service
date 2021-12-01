const Router = require('@koa/router');

const { getAll, getById, createUser, updateUser, deleteUser } = require('./user.service')

const router = new Router()

router.get('/users', async (ctx) => {
    ctx.body = await getAll()
})

router.get('/users/:id', async (ctx) => {
  const {id} = ctx.params
  const user = await getById(id)
    ctx.body = user
})

router.post('/users', async (ctx) => {
  const inputUser = ctx.request.body
  const user = await createUser(inputUser)
  const { id, name, login } = user
  ctx.body = { id, name, login}
})

router.put('/users/:id', async (ctx) => {
  const {id} = ctx.params
  const inputUser = ctx.request.body
  const user = await updateUser(id, inputUser)
  
  ctx.body = user
})

router.delete('/users/:id', async (ctx) => {
  const {id} = ctx.params
  deleteUser(id)
  ctx.body = `user ${id} deleted`
})

module.exports = router