import path from "path";
import { ConnectionOptions } from "typeorm";
import {
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST
} from "./common/config";

 export default {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT ? Number(POSTGRES_PORT): 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB || 'postgres',
    synchronize: false,
    logging: false,
    entities: ['src/resources/**/**.model{.ts,.js}'],
    migrationsRun: true,
    dropSchema: true,
    migrations: [path.join(__dirname, '/migrations/**/*.ts')],
    cli: {
        "migrationsDir": "./src/migration",
    },
} as ConnectionOptions

