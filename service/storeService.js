const StoreRepository = require("../repository/store.repository.js");

class StoreService {
  constructor() {
    this.storeRepository = new StoreRepository();
  }
  //상점 등록
  createStore = async (user, name, address) => {
    try {
      if (!user.isOwner) {
        return {message:"권한이 없습니다."}
      }

      return await this.storeRepository.createStore(
        user,
        name,
        address
      );
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
    return await this.storeRepository.getOneStore(storeId);
  };

  //상점 정보 업데이트
  updatedStore = async (storeId, userId, name) => {
    return await this.storeRepository.updatedStore(storeId, userId, name);
  };

  //상점 정보 삭제
  deleteStore = async (storeId, userId, isOwner) => {
    return await this.storeRepository.deleteStore(storeId, userId, isOwner);
  };
}
module.exports = StoreService;
