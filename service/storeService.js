const StoreRepository = require("../repository/store.repository.js");
const bcrypt = require("bcrypt");
class StoreService {
  constructor() {
    this.storeRepository = new StoreRepository();
  }
  //상점 등록
  createStore = async (user, name, address) => {
    try {
      if (!name && !address) {
        return { status: 400, errorMessage: "가게이름과 주소를 기입해야합니다." };
      }
      return await this.storeRepository.createStore(user, name, address);
    } catch (err) {
      console.log(err);
    }
  };

  //전체 지점 검색
  getAllStore = async () => {
    return await this.storeRepository.getAllStore();
  };

  //특정 지점 검색
  getOneStore = async (storeId) => {
    return await this.storeRepository.getOneStore(storeId.storeId);
  };

  //상점 정보 업데이트
  updateStore = async (storeId, user, name, address, password) => {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return {
        status: 400,
        errorMessage: "비밀번호가 일치하지 않습니다.",
      };
    }
    let updateValues = {};
    if (name) updateValues.name = name;
    if (address) updateValues.address = address;

    return await this.storeRepository.updateStore(
      storeId,
      user.id,
      updateValues
    );
  };

  //상점 정보 삭제
  deleteStore = async (storeId, user, password) => {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { status: 400, errorMessage: "비밀번호가 일치하지 않습니다." };
    }
    return await this.storeRepository.deleteStore(storeId, user.id);
  };
}
module.exports = StoreService;
