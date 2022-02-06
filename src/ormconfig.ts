import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './common/config';

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  // migrations: [__dirname + '/migrations/*.js'],
  // migrationsRun: true,
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
} as ConnectionOptions;
