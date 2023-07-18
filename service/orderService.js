const OrderRepository = require('../repository/order.repository.js');

class OrderService{
    constructor(){
        this.orderRepository = new OrderRepository();
    }
}

module.exports=OrderService;