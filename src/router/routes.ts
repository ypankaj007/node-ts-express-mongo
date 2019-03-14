import * as express from 'express';
import UserRouter from './userRouter';
import AuthRouter from './authRouter';
import { IServer } from '../interfaces/serverInterface';
import { Auth } from '../config/authMiddleware';
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger-doc/swagger-api-v1.json');
import { upload } from '../service/fileUpload';

export default class Routes {
    /**
     * @param  {IServer} server
     * @returns void
     */
    static init(server: IServer): void {
        const router: express.Router = express.Router();

        server.app.use('/', router);
        // auth
        server.app.use('/api/v1/auth', new AuthRouter().router);
        // users
        server.app.use('/api/v1/users', Auth, new UserRouter().router);
        
        //Swagger API
      //  server.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        //File upload
        server.app.use('/api/v1/upload', express.Router().post('/', upload.single('file'), (req: any, res, next) => {
            res.send({'fileName': req.file.filename || ''});
        }));

        //images
        server.app.use('/images', express.static('uploads'))


    }
}
