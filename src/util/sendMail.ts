import * as nodemailer from 'nodemailer';
import { default as config } from '../env/index';

class Mailer {

    public sendMail (reciepent, subject, data) {
        var transporter = nodemailer.createTransport(
            config.envConfig.emailCredentials
           );

           const mailOptions = {
            from: 'rajat.singhal@mail.vinove.com', // sender address
            to: reciepent, // list of receivers
            subject: subject , 
            html: `<p>Hi ${data.name}</p><p>Please click here ${data.url} to verify account</p>`
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if(err){
              console.log(err)
              return 0
            }
            else{
              console.log(info);
              return 1
            }
         });
    }
}

export default new Mailer(); 