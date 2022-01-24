import { Context, Next } from 'koa'
import Router from '@koa/router'
import { 
  getAllService,
  getByIdService,
  createUserService,
  updateUserService,
  deleteUserService
} from "./user.service";
import { varifyToken } from '../../common/middleware/auth';


export const routerUser = new Router()

routerUser.get('/users', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
    ctx.body = await getAllService()
    await next()
})

routerUser.get('/users/:id', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const {id} = ctx.params
  const user = await getByIdService(id)
  if(!user) {
    ctx.body = 'User not found!'
    ctx.status = 404
  } else
    ctx.body = user
    await next()
})

routerUser.post('/users', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const inputUser = ctx.request.body
  const user = await createUserService(inputUser)
  const { id, name, login } = user
  ctx.body = { id, name, login}
  ctx.status = 201
  await next()
})

routerUser.put('/users/:id', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const {id} = ctx.params
  const inputUser = ctx.request.body
  const user = await updateUserService(id, inputUser)
  
  ctx.body = user
  await next()
})

routerUser.delete('/users/:id', varifyToken, async (ctx: Context, next:Next):Promise<void> => {
  const {id} = ctx.params
  const user = await getByIdService(id)
  if (!user) {
    ctx.body = 'User not found!'
    ctx.status = 404
  }
  else {
    await deleteUserService(id)
    ctx.body = `user ${id} deleted`
    ctx.status = 204
  }
  await next()
})
