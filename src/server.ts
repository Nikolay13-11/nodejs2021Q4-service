import { app } from "./app";

import { ports } from './common/config';

app.listen(ports.PORT, ():void => console.log(`App is running on http://localhost:${ports.PORT}`))