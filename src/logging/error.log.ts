import { getStatusCode, StatusCodes } from 'http-status-codes';
import {Context, Next} from 'koa'
import { logger } from './logging';

// class ValidationError extends Error {
//     status = BAD_REQUEST;

//     text = getStatusText(this.status)
//   }


export const errorHandler = async (ctx: Context, next: Next) => {
    console.log('hello90')
    try {
        await next();
      } catch (err: any) {
        err.status = err.statusCode || err.status || 500;
        ctx.body = err.message;
        // logger.warn(err.message)
        ctx.status = 500
      }
}

// export const test = () => console.log(getStatusCode("OK"))
