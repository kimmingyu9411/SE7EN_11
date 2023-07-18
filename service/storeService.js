
const StoreRepository = require('../repository/store.repository.js');

class StoreService{
    constructor(){
        this.storeRepository = new StoreRepository();
    }
  //상점 등록
  createStore = async ({
    userId,
    isOner,
    storeName,
    storeAddress,
    storeImage,
  }) => {
    try {
      if (!isOner) {
        throw new Error("권한이 없습니다.");
      }

      return await this.storeRepository.createStore({
        userId,
        isOner,
        storeName,
        storeAddress,
        storeImage,
      });
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
  updatedStore = async ({
    storeId,
    userId,
    isOner,
    storeName,
    storeAddress,
    storeImage,
  }) => {
    return await this.storeRepository.updatedStore(
      storeId,
      userId,
      isOner,
      storeName,
      storeAddress,
      storeImage
    );
  };

  //상점 정보 삭제
  deleteStore = async ({storeId, userId, isOner}) => {
    return await this.storeRepository.deleteStore(storeId, userId, isOner);
  };
}
module.exports = StoreService