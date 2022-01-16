import { createConnection } from "typeorm";
import { app } from "./app";

import { ports } from './common/config';
import { configORM } from "./ormconfig";

import { loggerStart } from './logging/logger';

(async () => {
    await createConnection(configORM)
})()
// createConnection(configORM)

app.listen(ports.PORT, () => loggerStart.info(`App is running on http://localhost:${ports.PORT}`));