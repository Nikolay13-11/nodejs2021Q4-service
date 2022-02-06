"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
async function bootstrap() {
    let app;
    if (process.env.USE_FASTIFY === 'true') {
        console.log('App use fastify');
        app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    }
    else {
        console.log('App use express');
        app = await core_1.NestFactory.create(app_module_1.AppModule);
    }
    app.get(config_1.ConfigService);
    await app.listen(process.env.PORT || 4000);
}
bootstrap();
