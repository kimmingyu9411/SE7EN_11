const StoreService = require("../service/storeService.js");

class StoreController {
  constructor() {
    this.storeService = new StoreService();
  }

  getAllStore = async (req, res, next) => {
    const getAll = await this.storeService.getAllStore();

    if (getAll.status === 400) {
      res.status(400).json({ message: getAll.errorMessage });
    } else {
      res.status(200).json({ data: getAll });
    }
  };

  getOneStore = async (req, res, next) => {
    const storeId = req.params;

    const getOne = await this.storeService.getOneStore(storeId);
    if (getOne.status === 400) {
      res.status(400).json({ message: getOne.errorMessage });
    } else {
      res.status(200).json({ data: getOne });
    }
  };

  createStore = async (req, res, next) => {
    const userId = req.locals.user;
    const { isOwner, name, address } = req.body;

    const create = await this.storeService.createStore(userId, isOwner, name);
    if (create.status === 400) {
      res.status(400).json({ message: getOne.errorMessage });
    } else {
      res.status(200).json({ message: "가게 생성에 성공했습니다." });
    }
  };

  updateStore = async (req, res, next) => {
    const storeId = req.params;
    const userId = req.locals.user;
    const { name } = req.body;

    const update = await this.storeService.updateStore(storeId, userId, name);
    if (update.status === 400) {
      res.status(400).json({
        message: update.errorMessage,
      });
    } else {
      res.status(200).json({ message: "가게 정보 수정에 성공했습니다" });
    }
  };

  deleteStore = async (req, res, next) => {
    const storeId = req.params;
    const { userId, isOwner } = req.locals.user;

    const deleteStore = await this.storeService.deleteStore(
      storeId,
      userId,
      isOwner
    );
    if (deleteStore.status === 400) {
      res.status(400).json({
        message: deleteStore.errorMessage,
      });
    } else {
      res.status(200).json({ message: "가게 삭제가 완료되었습니다." });
    }
  };
}
module.exports = StoreController;
