const LogService = require('../service/logService.js');

class LogController{
    constructor(){
        this.logService = new LogService();
    }
    getLogs = async(req, res, next)=>{
        const user = res.locals.user;
        
        let store;
        if(user.isOwner) {
            store = res.locals.store;
        }

        const result = user.isOwner == true ? await this.logService.getLogsByOwner(user,store) : await this.logService.getLogsByCustomer(user);

        res.status(200).json({result})
    }
}

module.exports = LogController;