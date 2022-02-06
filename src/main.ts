import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  let app;

  if (process.env.USE_FASTIFY === 'true') {
    console.log('App use fastify');
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  } else {
    console.log('App use express');
    app = await NestFactory.create<NestExpressApplication>(AppModule);
  }
  app.get(ConfigService);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
