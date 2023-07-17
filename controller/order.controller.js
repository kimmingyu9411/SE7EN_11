import {OrderService} from '../service/orderService.js';

class OrderController{
    constructor(){
        this.orderService = new OrderService();
    }
}