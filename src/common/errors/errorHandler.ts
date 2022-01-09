import { StatusCodes } from 'http-status-codes';
import { logger } from '../../logging/logger';
import { TError } from '../models/modules';
import { CustomError } from './customError';

export const errorHundler: TError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof CustomError) {
      logger.warn(ctx);
      ctx.status = err.statusCode;
      ctx.body = {
        message: err.message
      };
    } else {
      logger.warn(`Internal Server Error 500`);
      ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = {
        message: 'Internal Server Error.'
      };
    }
  }
};