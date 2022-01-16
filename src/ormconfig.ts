import { ConnectionOptions } from "typeorm";
import { Board } from "./resources/boards/boards.model";
import { Task } from "./resources/tasks/task.model";
import { User } from "./resources/users/user.model";
import {
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST
} from "./common/config";

export const configORM: ConnectionOptions = {
    type: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT ? Number(POSTGRES_PORT): 5432,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB || 'postgres',
    synchronize: true,
    logging: false,
    entities: [User, Board, Task],
    // migrationsRun: true,
}
