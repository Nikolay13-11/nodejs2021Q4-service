import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { Context, Next } from 'koa';
import { JWT_SECRET_KEY } from '../config';

// eslint-disable-next-line consistent-return
export const varifyToken = (ctx: Context, next: Next) => {

    let token!: string;
    if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer') {
        // eslint-disable-next-line prefer-destructuring
        token = ctx.headers.authorization.split(' ')[1]
    }

    if (!token) {
        ctx.status = 401
        ctx.body = "A token is requared for authentification"
    }

    try {
        const decode = jwt.verify(token, JWT_SECRET_KEY as string)
        return next()
    } catch(err) {
        ctx.body = 'Invalid Token'
        ctx.status = 401
        console.log(err)
    }

}

export const generateHash = async (password: string) => {
    const hash = await bcrypt.hash(password ,10)
    return hash
}


