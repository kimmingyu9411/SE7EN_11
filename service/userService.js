const UserRepository = require("../repository/user.repository.js");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth.js");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  //회원 가입
  createUser = async (
    email,
    password,
    name,
    confirmPassword,
    nickname,
    address,
    isOwner
  ) => {
    const emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    try {
      if (!emailReg.test(email)) {
        throw new Error("이메일 형식이 일치하지 않습니다.");
      }
      if (password !== confirmPassword) {
        throw new Error("패스워드가 일치하지 않습니다.");
      }
      if (!passwordReg.test(password)) {
        throw new Error("비밀번호 형식이 일치하지 않습니다.");
      }
      if (!nickname) {
        throw new Error("닉네임을 기입하지 않았습니다.");
      }

      let point;
      isOwner == true ? (point = 0) : (point = 1000000);

      const hashPassword = await bcrypt.hash(password, 5);

      password = hashPassword;

      return await this.userRepository.createUser(
        email,
        password,
        name,
        nickname,
        address,
        isOwner,
        point
      );
    } catch (err) {
      console.log(err);
    }
  };

  //로그인
  login = async (email, password) => {
    try {
      const user = await this.userRepository.login(email);
      const passwordMatch = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      if (user && passwordMatch) {
        const accToken = auth.getAccessToken(user.dataValues.id);
        const refToken = auth.getRefreshToken(user.dataValues.id);
        await user.update({ token: refToken });
        return { accToken, refToken };
      } else {
        return { message: "이메일 혹은 비밀번호가 일치하지 않습니다." };
      }
    } catch (err) {
      console.log(err);
    }
  };

  //프로필 조회
  profile = async (id) => {
    const userProfile = await this.userRepository.profile(id);
    if (!userProfile) {
      throw new Error("해당 유저는 존재하지 않습니다.");
    }
    return userProfile;
  };

  //프로필 업데이트
  userUpdate = async (
    name,
    address,
    nickname,
    password,
    newPassword,
    newComfirm,
    user
  ) => {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    if (newPassword) {
      if (newPassword !== newComfirm) {
        throw new Error("새로운 비밀번호가 일치하지 않습니다.");
      }
      const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      if (!passwordReg.test(newPassword)) {
        throw new Error("새로운 비밀번호의 형식이 일치하지 않습니다.");
      }
    }
    const hashPassword = !newPassword
      ? newPassword
      : await bcrypt.hash(newPassword, 5);

    let updateValues = {};
    if (user) updateValues.id = user.id;
    if (hashPassword) updateValues.password = hashPassword;
    if (nickname) updateValues.nickname = nickname;
    if (name) updateValues.name = name;
    if (address) updateValues.address = address;

    return await this.userRepository.userUpdate(updateValues);
  };

  //회원 탈퇴
  userDelete = async (user, password) => {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }
    return await this.userRepository.userDelete(user.id);
  };
}

module.exports = UserService;
