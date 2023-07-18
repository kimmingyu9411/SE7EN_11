import { StoreRepository } from "../repository/store.repository.js";

export class StoreService {
  constructor() {
    this.storeRepository = new StoreRepository();
  }
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

  getAllStore = async () => {
    return await this.storeRepository.getAllStore();
  };

  getOneStore = async (storeId) => {
    return await this.storeRepository.getOneStore(storeId);
  };

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

  deleteStore = async ({storeId, userId, isOner}) => {
    return await this.storeRepository.deleteStore(storeId, userId, isOner);
  };
}
