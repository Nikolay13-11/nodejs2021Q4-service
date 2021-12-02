const Router = require('@koa/router');

const { getAll, getById, createTask, updateTask, deleteTask } = require('./task.service')

const router = new Router()

router.get('/boards/:boardId/tasks', async (ctx) => {
  const {boardId} = ctx.params
    ctx.body = await getAll(boardId)
})

router.get('/boards/:boardId/tasks/:taskId', async (ctx) => {
  const { boardId, taskId} = ctx.params
  const task = await getById(boardId, taskId)
    if(!task) {
      ctx.status = 404
    } else
    ctx.body = task
})

router.post('/boards/:Id/tasks', async (ctx) => {
  const {Id} = ctx.params
  const inputTask = ctx.request.body
  inputTask.boardId = Id
  const task = await createTask(inputTask)
  const {
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  } = task
  ctx.body = {
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  }
  ctx.status = 201
})

router.put('/boards/:boardId/tasks/:taskId', async (ctx) => {
  const { boardId, taskId } = ctx.params
  const inputTask = ctx.request.body
  const task = await updateTask(boardId, taskId, inputTask)
  ctx.status = 200
  ctx.body = task
})

router.delete('/boards/:boardId/tasks/:taskId', async (ctx) => {
  const { boardId, taskId } = ctx.params
  const task = await getById(boardId, taskId)
  if(!task) {
    ctx.status = 404
  }
  else {
    deleteTask(boardId, taskId)
    ctx.body = `task ${taskId} deleted`
    ctx.status = 204
  }
})

module.exports = router