import { UserService } from "../service/userService.js";

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  profile = async (req, res, next) => {
    const userId = req.locals.payload;

    const profile = await this.userService.profile(userId);
    return profile;
  };

  createUser = async (req, res, next) => {
    const { email, password, confirmPassword, nickname, isOner } = req.body;
    await this.userService.createUser(
      email,
      password,
      confirmPassword,
      nickname,
      isOner
    );

    return payload;
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    const login = await this.userService.login(email, password);
    return login;
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
