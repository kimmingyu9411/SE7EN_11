import dotenv from 'dotenv';
dotenv.config();

function getValue(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue;

    if(!value){
        throw new Error('There is no value in Process variable');
    }else{
        return value;
    }
};

export const config = {
    // db:{
    //     database : this.getValue('DB_DATABASE',''),
    //     host : this.getValue('DB_HOST',''),
    //     username : this.getValue('DB_USERNAME',''),
    //     password : this.getValue('DB_PASSWORD',''),
    // },
    // jwt:{
    //     secretKey : this.getValue('JWT_SECRET_KEY','gMhHLk&9dzpv$4#rP!3NdAr00gTq3$SS'),
    //     expiresIn : this.getValue('JWT_EXPIRES_IN','1h')
    // },
    server:{
        port:Number(getValue('PORT',8080))
    }
};