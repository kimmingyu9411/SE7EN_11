const UserService = require('../service/userService.js');

class UserController{
    constructor(){
        this.userService = new UserService();
    }
}

module.exports = UserController;