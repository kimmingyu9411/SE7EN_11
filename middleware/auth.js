const jwt = require('jsonwebtoken');
const User = require('../database/model/user.js');
const {accessExpiresIn,accessSecretKey,refreshExpiresIn,refreshSecretKey} = require('../config.js').jwt;

class Auth{
    constructor(){
        this.jwt = jwt;
        this.User = User;
    }
    getAccessToken (userId,isOwner){
        return 'Bearer ' + this.jwt.sign({userId,isOwner},accessSecretKey,{expiresIn:accessExpiresIn});
    }
    getRefreshToken (userId,isOwner){
        return 'Bearer ' + this.jwt.sign({userId,isOwner},refreshSecretKey,{expiresIn:refreshExpiresIn});
    }
    verify (req, res, next){
        const accessToken = req.cookie('accessToken');

        if(accessToken){
            let token = accessToken.split(' ')[1];

            const Payload = this.jwt.verify(token,accessSecretKey,(err,decoded)=>{
                if(err){ // accessToken verify failed
                    const refreshToken = req.cookie('refreshToken');
                    if(refreshToken){
                        token = refreshToken.split(' ')[1];
                    }else{
                        res.status(401).json({
                            errorMessage:"Please re-login again"
                        });
                    }
                }else{
                    return decoded;
                }
            });

        }else{ // AccessToken 미보유시
            res.status(400).json({
                errorMessage: "You have to login first" 
            });
        }
    }
}

const auth = new Auth();

module.exports = auth;