const StoreService = require('../service/storeService.js');

class StoreController{
    constructor(){
        this.storeService = new StoreService();
    }
}

module.exports = StoreController;