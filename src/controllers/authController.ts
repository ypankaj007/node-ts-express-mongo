import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import * as Joi from 'joi';
import * as passwordHash from 'password-hash';
import { default as config } from '../env/index';
import UserModel from '../models/userModel';
import AuthService from '../service/authService';

import Validator from '../validator/userValidator';
import { Messages } from './../util/message';
import  Mailer  from './../util/sendMail';

class AuthController {

    /**
     * @description login user through email and password.
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async login(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        
        try{

            let user = await UserModel.findOne({'email': req.body.email, 'isVerified': true})
            if (!user) {
                res.status(404).send({"message":Messages.ERROR_404})
            }

            // Compare password with hash and user input plain password
            let passStatus =  passwordHash.verify(req.body.password, user.password)
            if (passStatus == false || passStatus == "false")   
                res.status(401).send({"message":Messages.ERROR_401})

            //generate JWT token
            let token = await AuthService.newToken(user._id);
            return res.status(200).json({"data": token, "user" :{"_id": user._id, "name": user.name, "email": user.email}})

        }  catch(e) {
                return res.status(500).json({"message":e.message || Messages.ERROR_500})
        }
    }


    /**
     * @description Signup user takes name, email and password
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async signUp(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
       try {
            let validate = Joi.validate(req.body, Validator.CreateUserSchema);
            if (validate.error){
                return res.status(422).json({
                    error: validate.error.details[0].message + ''
                });
            }
            let value = validate.value;
            let isUserExists = await UserModel.findOne({'email': value.email, 'isVerified': true});
            if (isUserExists){
                return res.status(422).send({"message":Messages.ERROR_422})
            }

            value.password = passwordHash.generate(value.password);
            let user:any = await UserModel.create(value);       

            let emailToken = AuthService.emailToken(user._id);

            Mailer.sendMail(value.email, "EMAIL VERIFICATION", {"name": user.name, "url": config.envConfig.EMAIL_VERIFICATION_URL + '/' + emailToken})
            return res.status(200).json({"message": Messages.USER_CREATED, "data": emailToken})

       } catch (e) {
           return res.status(500).json({"message":e.message || Messages.ERROR_500})
       }
    }


    /**
     * @description Veification through email by user
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async verifyEmail(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        
        let token = req.params.token;
        if(!token){
            //throw new Error("Invalid token")
            res.status(401).send({"message":Messages.ERROR_401})
        }

        try {

            var decoded = jwt.verify(token, config.envConfig.EMAIL_SECRET);
            let user = await UserModel.findOne({_id: decoded.id, isVerified: false});
            if(!user) {
                res.status(404).send({"message":Messages.ERROR_404})
            }
            await UserModel.updateOne({_id: decoded.id}, {$set:{isVerified: true}});
            return res.status(200).json({"message": "Successfully verified"})

        } catch (e) {
            return res.status(500).json({"message":e.message || Messages.ERROR_500})
        }


    }

    /**
     * @description Forgot password takes email 
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async forgotPassword(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {

        try{
       
            let user = await UserModel.findOne({'email': req.body.email, 'isVerified': true})
            if (!user) {
                res.status(404).send({"message":Messages.ERROR_404})
            }

            let token = AuthService.passwordToken(user._id);

            await Mailer.sendMail(user.email, "Reset password", {"url" : config.envConfig.RESET_PASSWORD_URL + '/' + token})
            return res.status(200).json({"message": Messages.EMAIL_SENT, "data": token})

        }  catch (e) {
            return res.status(500).json({"message":e.message || Messages.ERROR_500})
        }

    }

     /**
     * @description Reset password takes new password from user. 
     * @param  {express.Request} req
     * @param  {express.Response} res
     * @param  {express.NextFunction} next
     */

    public async resetPassword(req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> {
        let token = req.params.token;
        if(!token){
            //throw new Error("Invalid token")
            res.status(401).send({"message":Messages.ERROR_402})
        }

        try {

            let hash = passwordHash.generate(req.body.password);
            var decoded = jwt.verify(token, config.envConfig.PASS_SECRET);
            let user = await UserModel.findOne({_id: decoded.id, isVerified: true});
            if(!user) {
                res.status(404).send({"message":Messages.ERROR_404})
            }
            await UserModel.updateOne({_id: decoded.id}, {$set:{password: hash}});
            return res.status(200).json({"message": Messages.PASSWORD_RESET})

        }  catch (e) {
            return res.status(500).json({"message":e.message || Messages.ERROR_500})
        }

    }

}

export default new AuthController();