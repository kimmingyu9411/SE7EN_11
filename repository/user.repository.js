const { User } = require("../database/model/user");

export class UserRepository {
  constructor() {
    this.users = []; // 사
  }

  async createUser(email, password, nickname, userAddress, isOner) {
    const user = {
      userId: this.generateUserId(), // 가정: 임의로 사용자 ID 생성
      email,
      password,
      nickname,
      userAddress,
      isOner,
    };
    this.users.push(user);
    return user;
  }

  async login({ email, password }) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      throw new Error("이메일 또는 패스워드가 일치하지 않습니다.");
    }
    return user;
  }

  async profile(userId) {
    return this.users.find((user) => user.userId === userId);
  }

  async userUpdate(userId, nickname, userAddress) {
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
      throw new Error("해당 유저는 존재하지 않습니다.");
    }
    user.nickname = nickname;
    user.userAddress = userAddress;
    return user;
  }

  async userDelete(userId) {
    const index = this.users.findIndex((user) => user.userId === userId);
    if (index === -1) {
      throw new Error("해당 유저는 존재하지 않습니다.");
    }
    const deletedUser = this.users.splice(index, 1);
    return deletedUser[0];
  }

  // 가정: 임의로 사용자 ID 생성 함수
  generateUserId() {
    return Date.now().toString();
  }
}
