import { BaseContext } from "koa";

export type TError = (
    ctx: BaseContext, 
    next: () => Promise<unknown>
  ) => Promise<void>;