const dotenv = require('dotenv');
dotenv.config()

function getValue(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue;

    if(!value){
        throw new Error('There is no value in Process variable');
    }else{
        return value;
    }
};

const config = {
    db:{
        database : getValue('DB_DATABASE',''),
        host : getValue('DB_HOST',''),
        username : getValue('DB_USERNAME',''),
        password : getValue('DB_PASSWORD',''),
    },
    jwt:{
        secretKey : getValue('JWT_SECRET_KEY','gMhHLk&9dzpv$4#rP!3NdAr00gTq3$SS'),
        expiresIn : getValue('JWT_EXPIRES_IN','1h')
    },
    server:{
        port:getValue('PORT',8080)
    }
};

module.exports = config;