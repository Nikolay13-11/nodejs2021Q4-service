import { app } from "./app";

import { ports } from './common/config';

import { loggerStart } from './logging/logging';

app.listen(ports.PORT, () => loggerStart.info(`App is running on http://localhost:${ports.PORT}`));