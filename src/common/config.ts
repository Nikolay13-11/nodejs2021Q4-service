import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
  path: join(__dirname, '../../.env'),
});

export const {
  PORT,
  POSTGRES_PORT,
  POSTGRES_DB,
  JWT_SECRET_KEY,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
} = process.env;
