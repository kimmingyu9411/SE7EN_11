const UserRepository = require("../repository/user.repository.js");
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
    console.log(
      "변수 데이터 확인",
      email,
      name,
      password,
      confirmPassword,
      nickname,
      address,
      isOwner
    );
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

      let point = 0;
      if (isOwner) {
        let point = 0;
      } else {
        let point = 1000000;
      }

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
    console.log(password)
    try {
      const user = await this.userRepository.login(email);
      console.log(user)
      if (user && user.dataValues.password == password) {
        const accToken = auth.getAccessToken(user.dataValues.id);
        const refToken = auth.getRefreshToken(user.dataValues.id);
        console.log(accToken, refToken)
        await user.update({ token: refToken });
        return {accToken, refToken}
      } else {
        return { message: "이메일 혹은 비밀번호가 일치하지 않습니다." };
      }
    } catch (err) {
      console.log(err);
    }
  };

  //프로필 조회
  profile = async (userId) => {
    const userProfile = await this.userRepository.profile(userId);
    if (!userProfile) {
      throw new Error("해당 유저는 존재하지 않습니다.");
    }
    return userProfile;
  };

  //프로필 업데이트
  userUpdate = async (userId, name, nickname, address) => {
    return await this.userRepository.userUpdate(
      userId,
      name,
      nickname,
      address
    );
  };

  //회원 탈퇴
  userDelete = async (userId) => {
    return await this.userRepository.userDelete(userId);
  };
}

module.exports = UserService;
