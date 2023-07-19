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

      return await this.userRepository.createUser(
        email,
        password,
        name,
        nickname,
        address,
        isOwner
      );
    } catch (err) {
      console.log(err);
    }
  };

  //로그인
  login = async (email, password) => {
    try {
      const user = await this.userRepository.login(email, password);
      const token = jwt.sign({ userId: user.userId }, "custom-secret-key");
      return token;
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
