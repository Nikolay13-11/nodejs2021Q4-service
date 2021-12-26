import { Context, Next} from 'koa'
import Router from '@koa/router'
import {
  getAllService,
  getByIdService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService
} from './task.service'

export const routerTask = new Router()

routerTask.get('/boards/:boardId/tasks', async (ctx: Context, next:Next):Promise<void> => {
  const {boardId} = ctx.params
    ctx.body = await getAllService(boardId)
    next()
})

routerTask.get('/boards/:boardId/tasks/:taskId', async (ctx: Context, next:Next):Promise<void> => {
  const { taskId } = ctx.params
  const task = await getTaskService(taskId)
    if(!task) {
      ctx.status = 404
    } else
    ctx.body = task
    next()
})

routerTask.post('/boards/:Id/tasks', async (ctx: Context, next:Next):Promise<void> => {
  const {Id} = ctx.params
  const inputTask = ctx.request.body
  inputTask.boardId = Id
  const task = await createTaskService(inputTask)
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
  next()
})

routerTask.put('/boards/:boardId/tasks/:taskId', async (ctx: Context, next:Next):Promise<void> => {
  const { taskId } = ctx.params
  const inputTask = ctx.request.body
  const task = await updateTaskService( taskId, inputTask)
  ctx.body = task
  ctx.status = 200
  next()
})

routerTask.delete('/boards/:boardId/tasks/:taskId', async (ctx: Context, next:Next):Promise<void> => {
  const { boardId, taskId } = ctx.params
  const task = await getByIdService(boardId, taskId)
  if(!task) {
    ctx.status = 404
  }
  else {
    deleteTaskService(boardId, taskId)
    ctx.body = `task ${taskId} deleted`
    ctx.status = 204
  }
  next()
})
