import {OrderRepository} from '../repository/order.repository.js';

export class OrderService{
    constructor(){
        this.orderRepository = new OrderRepository();
    }
}