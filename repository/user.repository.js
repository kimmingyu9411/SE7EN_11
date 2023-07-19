const User = require('../database/model/user.js');

class UserRepository{
    getUserDetail(){}
    async createUser(
        email,
        name,
        password,
        nickname,
        address,
        isOwner
        ){
            let point;
            isOwner==true ? point= 0 : point=1000000;
            const createdUser = await User.create({
                email,
                name,
                password,
                nickname,
                address,
                isOwner,
                point
            });
            return createdUser;
        }
    updateUser(){}
    deleteUser(){}
}

module.exports = UserRepository