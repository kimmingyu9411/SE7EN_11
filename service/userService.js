const UserRepository = require('../repository/user.repository.js');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }
}

module.exports = UserService;