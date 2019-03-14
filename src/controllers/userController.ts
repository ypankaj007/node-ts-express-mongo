import UserModel from '../models/userModel';
import * as express from 'express';
import { Messages } from './../util/message';

class UserController {

    /**
     * @param  {any} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public async get(req: any, res: express.Response, next: express.NextFunction): Promise < any > {

        try{
            let user = await UserModel.findOne({_id: req.loggedInUser.id});
            return res.status(200).json({"_id": user._id, "name": user.name, "email": user.email})
        } catch (e) {
            return res.status(500).json({"message":Messages.ERROR_500})
        }
      
    }

   
    /**
     * @param  {any} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */
    public update(req: any, res: express.Response, next: express.NextFunction): void {

       
    }


}

export default new UserController();