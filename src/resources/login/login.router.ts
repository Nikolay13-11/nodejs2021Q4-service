import Router from "@koa/router";
import { loginService } from "./login.service";

export const routerLogin = new Router;

routerLogin.post('/login', async (ctx) => {
    await loginService(ctx)
});
