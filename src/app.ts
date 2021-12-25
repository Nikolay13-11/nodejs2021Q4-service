import  bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import koaLogger from 'koa-logger-winston';
import process from 'process';
import { routerUser } from './resources/users/user.router'
import { routerTask } from './resources/tasks/task.router'
import { boardRouter } from './resources/boards/boards.router'
// import { logger } from './logging/logging';
// import { logger } from './logging/logger.koa';
import { logger, loggerError } from './logging/logging'; // Winston instance.
import { errorHandler } from './logging/error.log';



export const app = new Koa()


app.use(bodyParser())
// app.use(koaLogger(logger));

app.use(async (ctx, next) => {
    await next()
    logger.http(ctx)
  });


// process.on('unhandledRejection', errorHandler);
// app.on(errorHandler)



app.use(routerUser.routes())
.use(routerUser.allowedMethods())
app.use(boardRouter.routes())
.use(boardRouter.allowedMethods())
app.use(routerTask.routes())
.use(routerTask.allowedMethods())


app.on('error', err => {
    // console.log('errrrr', err)
    loggerError.error(err)
});
// process.on('unhandledRejection', errorHandler);


// process.on('uncaughtException', (err: Error, origin) => {
//     loggerError.error(err)
// });
// process.on('unhandledRejection', (err: Error, origin) => {
//     loggerError.error(err)
// });
// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

