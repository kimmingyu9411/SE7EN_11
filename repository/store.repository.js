const Store = require("../database/model/store");

class StoreRepository {
  async createStore(user, name, address) {
    try {
      const existingStore = await Store.findOne({ where: { name } });

      if (existingStore) {
        return {
          status: 400,
          errorMessage: "이미 사용 중인 점포명입니다.",
        };
      }
      const store = await Store.create({
        name,
        address,
        userId: user.id,
      });

      return store;
    } catch (error) {
      console.error("점포 생성 중 오류:", error);
      return {
        status: 400,
        errorMessage: "점포 생성 중 오류가 발생했습니다.",
      };
    }
  }

  async getOneStore(storeId) {
    try {
      const store = await Store.findByPk(storeId);

      if (!store) {
        console.error(!store);
        return {
          status: 400,
          errorMessage: "해당 점포를 찾을 수 없습니다.",
        };
      }

      return store;
    } catch (error) {
      console.error("점포 조회 중 오류:", error);
      return {
        status: 400,
        errorMessage: "점포 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async getAllStore() {
    try {
      const stores = await Store.findAll();
      return stores;
    } catch (error) {
      console.error("점포 목록 조회 중 오류:", error);
      return {
        status: 400,
        errorMessage: "점포 목록 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async updateStore(storeId, id, updateValues) {
    try {
      const existingStore = await Store.findOne({ where: {name:updateValues.name} });
      const store = await Store.update(updateValues, {
        where: { id: storeId, userId: id },
      });
      if (!store[0]) {
        return {
          status: 400,
          errorMessage: "해당 점포를 찾을 수 없습니다.",
        };
      }
      if (existingStore) {
        return {
          status: 400,
          errorMessage: "이미 사용 중인 점포명입니다.",
        };
      }
      return { message: "점포가 업데이트 됐습니다." };
    } catch (error) {
      console.error("점포 이름 업데이트 중 오류:", error);
      return {
        status: 400,
        errorMessage: "점포 업데이트 중 오류가 발생했습니다.",
      };
    }
  }

  async deleteStore(storeId, id) {
    try {
      const store = await Store.findOne({
        where: { id: storeId.storeId, userId: id },
      });

      if (!store) {
        return {
          status: 400,
          errorMessage: "해당 점포를 찾을 수 없습니다.",
        };
      }

      await store.destroy();

      return { message:"점포 삭제가 완료되었습니다."};
    } catch (error) {
      console.error("점포 삭제 중 오류:", error);
      return {
        status: 400,
        errorMessage: "점포 삭제 중 오류가 발생했습니다.",
      };
    }
  }
}
module.exports = StoreRepository;
