const jwt = require('jsonwebtoken');
import { default as config } from '../env/index';

class AuthService{

    public newToken(id: string): any{
        return jwt.sign({
            id: id
          },
          config.envConfig.JWT_SECRET
          );
    }


    /**
    * @description Generate email token with five min expiry time
    * @returns { String }
    */
    public emailToken (id: string) {
        return jwt.sign({
            id: id
          },
          config.envConfig.EMAIL_SECRET,
          {
              expiresIn: "5m"
          }
          );
    }


    public passwordToken (id: string) {
        return jwt.sign({
            id: id
          },
          config.envConfig.PASS_SECRET,
          {
              expiresIn: "5m"
          }
          );
    }


}

export default new AuthService();