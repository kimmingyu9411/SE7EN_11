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
      res.status(400).json({ errorMessage: user.errorMessage });
    } else {
      return res.status(200).json({ message: user.message });
    }
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    const token = await this.userService.login(email, password);
    if (!token.accToken) {
      res.status(400).json({
        message: token.message,
      });
    } else {
      res.cookie("Authorization", token.accToken);
      res.cookie("refreshToken", token.refToken,{httpOnly:true, sameSite:'none'});
      res.status(200).json({
        message: "로그인 성공",
        accessToken: token.accToken,
        refreshToken: token.refToken,
      });
    }
  };

  updateUser = async (req, res, next) => {
    const { name, address, nickname, password, newPassword, newConfirm } =
      req.body;
    const user = res.locals.user;

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
    const user = res.locals.user;
    const { password } = req.body;

    const deleteUser = await this.userService.userDelete(user, password);
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
