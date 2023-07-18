const UserService = require('../service/userService.js');

class UserController{
    constructor(){
        this.userService = new UserService();
    }
    getUser = (req, res, next) => {};
  profile = async (req, res, next) => {
    const {userId} = req.locals.payload;

    return await this.userService.profile(userId);
  };

  createUser = async (req, res, next) => {
    const { email, password, confirmPassword, nickname, isOner } = req.body;
    
    return await this.userService.createUser(
      email,
      password,
      confirmPassword,
      nickname,
      isOner
    );
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    return await this.userService.login(email, password);
  };

  updateUser = async (req, res, next) => {
    const { nickname, userAddress } = req.body;
    const userId = req.locals.payload;

    return await this.userService.userUpdate(userId, nickname, userAddress);
  };

  deleteUser = async (req, res, next) => {
    const { userId, isOner } = req.locals.payload;

    return await this.userService.userDelete(userId, isOner);
  };
}

module.exports = UserController;