const User = require("../database/model/user");
const jwt = require("jsonwebtoken");

class UserRepository {
  async createUser(
    email,
    password,
    name,
    nickname,
    address,
    isOwner
  ) {
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
        password,
        name,
        nickname,
        address,
        isOwner,
      });

      // // 회원 가입 성공한 경우, 포인트 지급
      // if (isOwner) {
      //   // 사장님은 0 포인트 지급
      //   await user.update({ points: 0 });
      // } else {
      //   // 일반 회원은 100만 포인트로 지급
      //   await user.update({ points: 1000000 });
      // }

      return user.id;
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        errorMessage: "회원가입 중 오류가 발생하였습니다",
      };
    }
  }

  // 로그인
  async login({ email, password }) {
    try {
      const user = await User.findOne({
        where: { email, password },
      });

      if (!user) {
        return {
          status: 400,
          errorMessage: "일치하는 이메일과 패스워드를 가진 유저가 없습니다.",
        };
      }

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
  async profile(userId) {
    try {
      const userProfile = await User.findByPk(userId);

      if (!userProfile) {
        return {
          status: 400,
          errorMessage: "해당 유저는 존재하지 않습니다.",
        };
      }

      return userProfile;
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        errorMessage: "프로필 조회 중 오류가 발생했습니다.",
      };
    }
  }

  // 프로필 업데이트
  async userUpdate(userId, nickname, address) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return {
          status: 400,
          errorMessage: "해당 유저는 존재하지 않습니다.",
        };
      }

      user.nickname = nickname;
      user.address = address;
      await user.save();

      return user;
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        errorMessage: "프로필 업데이트 중 오류가 발생했습니다.",
      };
    }
  }

  // 회원 탈퇴
  async userDelete(userId) {
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return {
          status: 400,
          errorMessage: "해당 유저는 존재하지 않습니다.",
        };
      }

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
