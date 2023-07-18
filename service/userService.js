import { UserRepository } from "../repository/user.repository.js";

export class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  createUser = async ({
    email,
    password,
    confirmPassword,
    nickname,
    userAddress,
    isOner,
  }) => {
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
      if (!userAddress) {
        throw new Error("주소를 기입하지 않았습니다.");
      }

      return await this.userRepository.createUser(
        email,
        password,
        nickname,
        userAddress,
        isOner
      );
    } catch (err) {
      console.log(err);
    }
  };

  login = async ({ email, password }) => {
    try {
      const user = await this.userRepository.login({ email, password });
      const token = jwt.sign({ userId: user.userId }, "custom-secret-key");
      return token;
    } catch (err) {
      console.log(err);
    }
  };

  profile = async ({userId}) => {
    const userprofile = await this.userRepository.profile(userId);
    if (!userprofile) {
      throw new Error("해당 유저는 존재하지 않습니다.");
    }
    return userprofile;
  };

  userUpdate = async ({userId, nickname, userAddress}) => {
   return await this.userRepository.userUpdate(userId, nickname, userAddress)
  };

  userDelete = async ({userId}) => {
    return await this.userRepository.userDelete(userId)
   };
}
