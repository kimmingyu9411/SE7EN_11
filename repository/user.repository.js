const User = require("../database/model/user");
const Cart = require("../database/model/cart");
const jwt = require("jsonwebtoken");
const Store = require("../database/model/store");

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
      const createdUser = await User.create({
        email,
        name,
        password,
        name,
        nickname,
        address,
        isOwner,
        point,
      });
      // 유저 생성과 동시에 Cart 테이블 생성
      await Cart.create({ userId: createdUser.get("id") });

      return { message: "회원가입이 완료되었습니다." };
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        errorMessage: "회원가입 중 오류가 발생하였습니다",
      };
    }
  }

  // 로그인
  async login(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  // 프로필 조회
  async profile(id) {
    try {
      const user = await User.findByPk(id, { include: { model: Store } });
      return user;
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
      await User.update(updateValues, {
        where: { id: updateValues.id },
      });
      return { message: "프로필이 업데이트 됐습니다." };
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

      const deleteuser=await user.destroy();
      if (deleteuser) {
        return {
          status: 200,
          Message: "회원 탈퇴가 되었습니다.",
        };
      } else {
        return {
          status: 400,
          errorMessage: "현재 비밀번호가 일치하지 않습니다.",
        };
      }
    } catch (error) {
      return {
        status: 400,
        errorMessage: "회원 탈퇴 중 오류가 발생했습니다.",
      };
    }
  }

  async mail(email){
    try {
      const user = await User.findOne({where:{email}});
      if(user){
        return {
          isSuccessful:false,
          message:'이미 존재하는 메일입니다.'
        };  
      }else{
        return {
          isSuccessful:true,
        };
      }
    } catch (e) {
      console.error(e);
      return {
        isSuccessful:false,
        message:'이메일 전송에 실패하였습니다. 다시 시도해주세요.'
      };
    }
  }
}

module.exports = UserRepository;
