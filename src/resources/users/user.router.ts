import { Context } from 'koa'
import Router from '@koa/router'
import { 
  getAllService,
  getByIdService,
  createUserService,
  updateUserService,
  deleteUserService
} from "./user.service";


export const routerUser = new Router()

routerUser.get('/users', async (ctx: Context):Promise<void> => {
    ctx.body = await getAllService()
})

routerUser.get('/users/:id', async (ctx: Context):Promise<void> => {
  const {id} = ctx.params
  const user = await getByIdService(id)
  if(!user) {
    ctx.status = 404
  } else
    ctx.body = user
})

routerUser.post('/users', async (ctx: any):Promise<void> => {
  const inputUser = ctx.request.body
  const user = await createUserService(inputUser)
  const { id, name, login } = user
  ctx.body = { id, name, login}
  ctx.status = 201
})

routerUser.put('/users/:id', async (ctx: any):Promise<void> => {
  const {id} = ctx.params
  const inputUser = ctx.request.body
  const user = await updateUserService(id, inputUser)
  
  ctx.body = user
})

routerUser.delete('/users/:id', async (ctx: Context):Promise<void> => {
  const {id} = ctx.params
  const user = await getByIdService(id)
  if(!user) {
    ctx.status = 404
  }
  else {
    deleteUserService(id)
    ctx.body = `user ${id} deleted`
    ctx.status = 204
  }
})
