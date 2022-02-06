import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TaskModule } from './tssks/task.module';
import { BoardModule } from './boards/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import ormconfig from './ormconfig';
import LogsMiddleware from './middleware/logs.middleware';

console.log(process.env.PORT);

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'admin',
    //   database: 'postgres',
    //   synchronize: false,
    //   entities: [User, Task, Board],
    //   migrationsRun: true,
    //   migrations: ['dist/migration/*.js'],
    //   cli: {
    //     migrationsDir: 'dist/migration',
    //   },
    // }),
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    TaskModule,
    BoardModule,
    ConfigModule.forRoot(),
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
