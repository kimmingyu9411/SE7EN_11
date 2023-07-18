import { UserService } from "../service/userService.js";

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getUser = (req, res, next) => {};

  createUser = (req, res, next) => {};

  updateUser = (req, res, next) => {};

  deleteUser = (req, res, next) => {};
}
