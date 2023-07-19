import { UserService } from "../service/userService.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  profile = async (req, res, next) => {
    const { userId } = req.locals.user;

    const data = await this.userService.profile(userId);
    if (data) {
      res.status(201).json({ data: data });
    } else {
      res.status(400).json({
        message: "데이터 조회에 실패했습니다.",
      });
    }
  };

  createUser = async (req, res, next) => {
    const {
      email,
      password,
      name,
      confirmPassword,
      nickname,
      address,
      isOwner,
    } = req.body;

    const user = await this.userService.createUser(
      email,
      name,
      password,
      confirmPassword,
      nickname,
      address,
      isOwner
    );
    if (user) {
      res.status(200).json({ message: "회원 가입이 완료되었습니다." });
    } else {
      res.status(400).json({
        message: "회원 가입이 실패했습니다.",
      });
    }
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    const login = await this.userService.login(email, password);
    if (login) {
      res.status(200).json({ message: "로그인 성공" });
    } else {
      res.status(400).json({
        message: "로그인 실패.",
      });
    }
  };

  updateUser = async (req, res, next) => {
    const { name, address } = req.body;
    const userId = req.locals.user;

    const update = await this.userService.userUpdate(
      userId,
      name,
      nickname,
      address
    );
    if (update) {
      res.status(200).json({ message: "회원 정보 수정에 성공했습니다." });
    } else {
      res.status(400).json({ message: "회원 정보 수정에 실패했습니다." });
    }
  };

  deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    const deleteUser = await this.userService.userDelete(userId);
    if (deleteUser) {
      res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." });
    } else {
      res.status(400).json({ message: "회원 탈퇴에 실패했습니다." });
    }
  };
}

module.exports = UserController;
