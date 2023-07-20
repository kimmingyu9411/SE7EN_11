const UserService = require("../service/userService.js");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  profile = async (req, res, next) => {
    const { id } = res.locals.user;

    const data = await this.userService.profile(id);

    res.status(201).json({ data: data });
  };

  // 여기 보고 if else 문 작성하기!!
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
      password,
      name,
      confirmPassword,
      nickname,
      address,
      isOwner
    );

    if (user.status === 400) {
      res.status(400).json({
        message: user.errorMessage,
      });
    } else {
      res.status(200).json({ message: "회원가입이 완료되었습니다." });
    }
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    console.log("token", token);
    if (!token.accToken) {
      res.status(400).json({
        message: token.message,
      });
    } else {
      res.cookie("accessToken", token.accToken);
      res.cookie("refreshToken", token.refToken);
      res.status(200).json({ message: "로그인 성공" });
    }
  };

  updateUser = async (req, res, next) => {
    const { name, address, nickname, password, newPassword, newConfirm } =
      req.body;
    const user = req.locals.user;

    const update = await this.userService.userUpdate(
      name,
      address,
      nickname,
      password,
      newPassword,
      newConfirm,
      user
    );
    if (update.status === 400) {
      res.status(400).json({
        message: token.errorMessage,
      });
    } else {
      res.status(200).json({ message: "상점 수정이 완료되었습니다" });
    }
  };

  deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    const deleteUser = await this.userService.userDelete(userId);
    if (deleteUser.status === 400) {
      res.status(400).json({
        message: deleteUser.errorMessage,
      });
    } else {
      res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." });
    }
  };
}

module.exports = UserController;
