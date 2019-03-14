import * as express from 'express';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as path from 'path';
import * as rfs from 'rotating-file-stream';

import Routes from './router/routes';
import Middleware from './config/middleware';
import Cron from './config/cron';

/**
 * @class Server
 */
export class Server {
    // set app to be of type express.Application
    public app: express.Application;

    constructor() {
        this.app = express();
        Cron.init();
        Middleware.init(this);
        Routes.init(this);
    }
}

// export
export default new Server().app;
