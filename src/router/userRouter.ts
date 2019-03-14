import UserController from '../controllers/userController';
import { Router } from 'express';
/**
 * @class UserRouter
 */
export default class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes(): void {
        this.router.get('/', UserController.get);
        this.router.put('/', UserController.update);
    }
}
