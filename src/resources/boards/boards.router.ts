import { Context } from 'koa'
import Router from '@koa/router'
import {
  getAllService,
  getByIdService,
  createBoardService,
  updateBoardService,
  deleteBoardService
}
from './boards.service'

export const boardRouter = new Router()

boardRouter.get('/boards', async (ctx: Context):Promise<void> => {
    ctx.body = await getAllService()
})

boardRouter.get('/boards/:id', async (ctx: Context):Promise<void> => {
  const {id} = ctx.params
  const board = await getByIdService(id)
  if(!board) {
    ctx.status = 404
  } else
    ctx.body = board
})

boardRouter.post('/boards', async (ctx: Context):Promise<void> => {
  const inputBoard = ctx.request.body
  const board = await createBoardService(inputBoard)
  const { id, title, columns } = board
  ctx.body = { id, title, columns }
  ctx.status = 201
})

boardRouter.put('/boards/:id', async (ctx: Context):Promise<void> => {
  const {id} = ctx.params
  const inputBoard = ctx.request.body
  const board = await updateBoardService(id, inputBoard)
  
  ctx.body = board
})

boardRouter.delete('/boards/:id', async (ctx: Context):Promise<void> => {
  const {id} = ctx.params
  const board = await getByIdService(id)
  if(!board) {
    ctx.status = 404
  }
  else {
    deleteBoardService(id)
    ctx.body = `board ${id} deleted`
    ctx.status = 204
  }
})
