const Router = require('@koa/router');

const { getAll, getById, createBoard, updateBoard, deleteBoard } = require('./boards.service')

const router = new Router()

router.get('/boards', async (ctx) => {
    ctx.body = await getAll()
})

router.get('/boards/:id', async (ctx) => {
  const {id} = ctx.params
  const board = await getById(id)
  if(!board) {
    ctx.status = 404
  } else
    ctx.body = board
})

router.post('/boards', async (ctx) => {
  const inputBoard = ctx.request.body
  const board = await createBoard(inputBoard)
  const { id, title, columns } = board
  ctx.body = { id, title, columns }
  ctx.status = 201
})

router.put('/boards/:id', async (ctx) => {
  const {id} = ctx.params
  const inputBoard = ctx.request.body
  const board = await updateBoard(id, inputBoard)
  
  ctx.body = board
})

router.delete('/boards/:id', async (ctx) => {
  const {id} = ctx.params
  const board = await getById(id)
  if(!board) {
    ctx.status = 404
  }
  else {
    deleteBoard(id)
    ctx.body = `board ${id} deleted`
    ctx.status = 204
  }
})

module.exports = router