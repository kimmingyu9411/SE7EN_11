const StoreService = require('../service/storeService.js');

class StoreController{
    constructor(){
        this.storeService = new StoreService();
    }
  getAllStore = async (req, res, next) => {
    return await this.storeService.getAllStore();
  };

  getOneStore = async (req, res, next) => {
    const storeId = req.params;

    return await this.storeService.getOneStore(storeId);
  };

  createStore = async (req, res, next) => {
    const userId = req.locals.payload;
    const { isOner, storeName, storeAddress, storeImage } = req.body;

    return await this.storeService.createStore(
      isOner,
      storeName,
      storeAddress,
      storeImage,
      userId
    );
  };

  updateStore = async (req, res, next) => {
    const storeId = req.params;
    const userId = req.locals.payload;
    const { storeName, storeAddress, storeImage } = req.body;

    return await this.storeService.updateStore(
      userId,
      storeId,
      storeName,
      storeAddress,
      storeImage
    );
  };

  deleteStore = async (req, res, next) => {
    const storeId = req.params
    const {userId, isOner} = req.locals.payload

    return await this.storeService.deleteStore(storeId, userId, isOner)
  };
}

module.exports = StoreController;