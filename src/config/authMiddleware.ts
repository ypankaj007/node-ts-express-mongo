
const jwt = require('jsonwebtoken');
import { default as config } from '../env/index';
import { Messages } from './../util/message'

/**
 * @description JWT token validation
 * @param req 
 * @param res 
 * @param next 
 * @returns success and error any encountered
 */
export const Auth = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).send({'message': Messages.UNAUTHORIZED});
       } else {
        try {
            var decoded = jwt.verify(req.headers.authorization, config.envConfig.JWT_SECRET);
            req.loggedInUser = decoded;
            next();
          } catch(err) {
            res.status(401).send(err.message);
          }
       }       
  }
  