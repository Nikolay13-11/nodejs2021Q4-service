import { Context, Next } from 'koa'
import Router from '@koa/router'
import { 
  getAllService,
  getByIdService,
  createUserService,
  updateUserService,
  deleteUserService
} from "./user.service";


export const routerUser = new Router()

routerUser.get('/users', async (ctx: Context, next:Next):Promise<void> => {
    ctx.body = await getAllService()
    next()
    // Promise.reject(Error('Oops!'));
  // throw Error('Oops!');
})

routerUser.get('/users/:id', async (ctx: Context, next:Next):Promise<void> => {
  const {id} = ctx.params
  const user = await getByIdService(id)
  if(!user) {
    ctx.body = 'User not found!'
    ctx.status = 404
  } else
    ctx.body = user
    next()
})

routerUser.post('/users', async (ctx: Context, next:Next):Promise<void> => {
  const inputUser = ctx.request.body
  const user = await createUserService(inputUser)
  const { id, name, login } = user
  ctx.body = { id, name, login}
  ctx.status = 201
  next()
})

routerUser.put('/users/:id', async (ctx: Context, next:Next):Promise<void> => {
  const {id} = ctx.params
  const inputUser = ctx.request.body
  const user = await updateUserService(id, inputUser)
  
  ctx.body = user
  next()
})

routerUser.delete('/users/:id', async (ctx: Context, next:Next):Promise<void> => {
  const {id} = ctx.params
  const user = await getByIdService(id)
  if(!user) {
    ctx.body = 'User not found!'
    ctx.status = 404
  }
  else {
    deleteUserService(id)
    ctx.body = `user ${id} deleted`
    ctx.status = 204
  }
  next()
})
