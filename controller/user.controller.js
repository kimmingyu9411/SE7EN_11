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
    res.status(200).json({ message: "회원가입이 완료되었습니다." });
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    res.cookie("accessToken", token.accToken);
    res.cookie("refreshToken", token.refToken);
    res.status(200).json({ message: "로그인 성공" });
  };

  updateUser = async (req, res, next) => {
    const { name, address, nickname, password, newPassword, newComfirm } =
      req.body;
    const user = res.locals.user;

    const update = await this.userService.userUpdate(
      name,
      address,
      nickname,
      password,
      newPassword,
      newComfirm,
      user
    );

    res.status(200).json({ data: update });
  };

  deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    await this.userService.userDelete(userId);

    res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." });
  };
}

module.exports = UserController;
