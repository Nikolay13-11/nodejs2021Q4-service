import jwt from 'jsonwebtoken'
import { Context } from 'vm'
import { JWT_SECRET_KEY } from "../../common/config"
import { User } from "../users/user.model"

export const loginService = async (ctx: Context) => {
    try {
        const { password } = ctx.request.body

        if(!ctx.request.body.login && !password) {
            ctx.body = 'All input are requared'
            ctx.status = 401
        }
         
        const userTarget = await User.findOne({name: ctx.request.body.login}) 
        if (userTarget) {
            const {id, login} = userTarget
            const jwtToken = jwt.sign(
                {
                    id,
                    login
                },
                JWT_SECRET_KEY as string
            )
            ctx.status = 201
            ctx.body = {
                token: jwtToken
            }
        } else {
            ctx.status = 403
            ctx.body = "User not Found"
        }

    }
    catch(err) {
        console.log(err)
    }
}