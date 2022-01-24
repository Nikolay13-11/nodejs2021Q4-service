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
import { varifyToken } from '../../common/middleware/auth'

export const routerTask = new Router()

routerTask.get('/boards/:boardId/tasks', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const {boardId} = ctx.params
    ctx.body = await getAllService(boardId)
    await next()
})

routerTask.get('/boards/:boardId/tasks/:taskId', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const { taskId } = ctx.params
  const task = await getTaskService(taskId)
    if(!task) {
      ctx.status = 404
    } else
    ctx.body = task
    await next()
})

routerTask.post('/boards/:Id/tasks', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
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
  await next()
})

routerTask.put('/boards/:boardId/tasks/:taskId', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const { taskId } = ctx.params
  const inputTask = ctx.request.body
  const task = await updateTaskService( taskId, inputTask)
  ctx.body = task
  ctx.status = 200
  await next()
})

routerTask.delete('/boards/:boardId/tasks/:taskId', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const { boardId, taskId } = ctx.params
  const task = await getByIdService(boardId, taskId)
  if(!task) {
    ctx.status = 404
  }
  else {
    await deleteTaskService(boardId, taskId)
    ctx.body = `task ${taskId} deleted`
    ctx.status = 204
  }
  await next()
})
