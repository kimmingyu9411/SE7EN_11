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
    const user = res.locals.user;
    const { name, address } = req.body;

    const create = await this.storeService.createStore(user, name, address);
    if (create.status === 400) {
      res.status(400).json({ errorMessage: create.errorMessage });
    } else {
      res.status(200).json({ Message: create.Message });
    }
  };

  updateStore = async (req, res, next) => {
    const { storeId } = req.params;
    const user = res.locals.user;
    const { name, address, password } = req.body;
    const update = await this.storeService.updateStore(
      storeId,
      user,
      name,
      address,
      password
    );
    if (update.status === 400) {
      res.status(400).json({errorMessage:update.errorMessage});
    } else {
      res.status(200).json({Message:update.Message});
    }
  };

  deleteStore = async (req, res, next) => {
    const storeId = req.params;
    const user = res.locals.user;
    const { password } = req.body;

    const deleteStore = await this.storeService.deleteStore(
      storeId,
      user,
      password
    );
    if (deleteStore.status === 400) {
      res.status(400).json({
        message: deleteStore.errorMessage,
      });
    } else {
      res.status(200).json(deleteStore);
    }
  };
}
module.exports = StoreController;
