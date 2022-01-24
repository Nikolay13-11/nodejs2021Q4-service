import { Context, Next } from 'koa'
import Router from '@koa/router'
import {
  getAllService,
  getByIdService,
  createBoardService,
  updateBoardService,
  deleteBoardService
}
from './boards.service'
import { varifyToken } from '../../common/middleware/auth'

export const boardRouter = new Router()

boardRouter.get('/boards', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
    ctx.body = await getAllService()
    await next()
})

boardRouter.get('/boards/:id', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const {id} = ctx.params
  const board = await getByIdService(id)
  if(!board) {
    ctx.status = 404
  } else
    ctx.body = board
    await next()
})

boardRouter.post('/boards', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const inputBoard = ctx.request.body
  const board = await createBoardService(inputBoard)
  const { id, title, columns } = board
  ctx.body = { id, title, columns }
  ctx.status = 201
  await next()
})

boardRouter.put('/boards/:id', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const {id} = ctx.params
  const inputBoard = ctx.request.body
  const board = await updateBoardService(id, inputBoard)
  
  ctx.body = board
  await next()
})

boardRouter.delete('/boards/:id', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const {id} = ctx.params
  const board = await getByIdService(id)
  if(!board) {
    ctx.status = 404
  }
  else {
    await deleteBoardService(id)
    ctx.body = `board ${id} deleted`
    ctx.status = 204
  }
  await next()
})
