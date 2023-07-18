const OrderService = require('../service/orderService.js');

class OrderController{
    constructor(){
        this.orderService = new OrderService();
    }
}

module.exports = OrderController