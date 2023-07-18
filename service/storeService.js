const StoreRepository = require('../repository/store.repository.js');

class StoreService{
    constructor(){
        this.storeRepository = new StoreRepository();
    }
}
module.exports = StoreService