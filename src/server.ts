import { createConnection } from "typeorm";
import { app } from "./app";

import { ports } from './common/config';

import { loggerStart } from './logging/logger';
import ormconfig from "./ormconfig";

(async () => {
    await createConnection(ormconfig)
})()
// createConnection(configORM)

app.listen(ports.PORT, () => loggerStart.info(`App is running on http://localhost:${ports.PORT}`));