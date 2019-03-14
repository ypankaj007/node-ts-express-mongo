// production config

export const envConfig: any = {
    database: {
        MONGODB_URI: 'mongodb://production_uri/',
        MONGODB_DB_MAIN: 'production_db'
    },
    emailCredentials:{
        host: 'mlsrvr.vinove.com',
        port: 587,
        auth: {
                user: 'rajat.singhal@mail.vinove.com',
                pass: 'rajat@123'  
            }
    },
    JWT_SECRET: '32hUW6aUGS3VHjEtAuDwfhnWAZqoPrGCDv',
    EMAIL_SECRET: '0E6A48F765D0FFFFF6247FA80D748E615F91DD0C7431E4D9',
    PASS_SECRET: 'b31d032cfdcf47a399990a71e43c5d2a',
    EMAIL_VERIFICATION_URL:"http://localhost:3000/api/v1/auth/verify/email",
    RESET_PASSWORD_URL:"http://localhost:3000/api/v1/auth/reset"
  
};
