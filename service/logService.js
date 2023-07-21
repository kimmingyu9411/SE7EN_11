const LogRepository = require('../repository/log.repository.js');

class LogService{
    constructor(){
        this.logRepository = new LogRepository();
    }
    async getLogsByOwner(user,store){
        return await this.logRepository.getLogsByOwner(user,store);
    }
    async getLogsByCustomer(user){
        return await this.logRepository.getLogsByCustomer(user);
    }
}

module.exports = LogService;