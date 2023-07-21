const Log = require('../database/model/log.js');

class LogRepository{
    async getLogsByOwner(user,store){
        const logs = await Log.findAll({where:{storeId:store.id}});
        return {logs, isSuccessful:true};
    }
    async getLogsByCustomer(user){
        const logs = await Log.findAll({where:{userId:user.id}});
        return {logs, isSuccessful:true};
    }
}

module.exports = LogRepository;