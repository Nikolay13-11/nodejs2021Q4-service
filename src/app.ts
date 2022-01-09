import  bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import { routerUser } from './resources/users/user.router'
import { routerTask } from './resources/tasks/task.router'
import { boardRouter } from './resources/boards/boards.router'
import { logger, loggerError } from './logging/logger'; // Winston instance.


export const app = new Koa()

// app.use(errorHundler)

app.use(bodyParser())

app.use(routerUser.routes())
.use(routerUser.allowedMethods())
app.use(boardRouter.routes())
.use(boardRouter.allowedMethods())
app.use(routerTask.routes())
.use(routerTask.allowedMethods())

app.use(async (ctx, next) => {
    await next()
    logger.info(ctx)
  });

app.on('error', (err: Error) => {
  loggerError.error(err)
});

// throw Error('Oops!');

// Promise.reject(Error('Oops!'));
