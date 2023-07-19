const User = require("../database/model/user");
const jwt = require("jsonwebtoken");

class UserRepository {
  async createUser(email, password, name, nickname, address, isOwner, point) {
    try {
      // 이미 존재하는 이메일인지 확인
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return {
          status: 400,
          errorMessage: "이미 사용 중인 이메일입니다.",
        };
      }
      // 존재하지 않는 경우, 새로운 유저 생성
      const user = await User.create({
        email,
        name,
        password,
        name,
        nickname,
        address,
        isOwner,
        point,
      });
      return user;
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        errorMessage: "회원가입 중 오류가 발생하였습니다",
      };
    }
  }

  // 로그인
  async login( email ) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        errorMessage: "로그인 중 오류가 발생했습니다.",
      };
    }
  }

  // 프로필 조회
  async profile(id) {
    try {
      return await User.findByPk(id);
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        errorMessage: "프로필 조회 중 오류가 발생했습니다.",
      };
    }
  }

  // 프로필 업데이트
  async userUpdate(updateValues) {
    try {
      await User.update(
        updateValues,
        {
            where: { id: updateValues.id }
        }
    );
      return {message:"프로필이 업데이트 됐습니다."};
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        errorMessage: "프로필 업데이트 중 오류가 발생했습니다.",
      };
    }
  }

  // 회원 탈퇴
  async userDelete(id) {
    try {
      const user = await User.findByPk(id);

      await user.destroy();

      return "회원 탈퇴가 완료되었습니다.";
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        errorMessage: "회원 탈퇴 중 오류가 발생했습니다.",
      };
    }
  }
}

module.exports = UserRepository;
