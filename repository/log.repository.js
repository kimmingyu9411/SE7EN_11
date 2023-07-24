const Log = require('../database/model/log.js');
const Product = require('../database/model/product.js');

class LogRepository{
    async getLogsByOwner(user,store){
        const logs = await Log.findAll({where:{storeId:store.id}});
        return {logs, isSuccessful:true};
    }
    async getLogsByCustomer(user){
        const logs = await Log.findAll({
            where:{userId:user.id},
            include:{
                model:Product,
                as:'PurchaseDescription'
            }
        });
        return {logs, isSuccessful:true};
    }
}

module.exports = LogRepository;