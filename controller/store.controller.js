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
    const user = res.locals.user;
    const { name, address } = req.body;

    const createdStore = await this.storeService.createStore(
      user,
      name,
      address
    );
    res.status(201).json({
      createdStore
    })
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