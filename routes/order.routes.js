const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth.js');
const OrderController = require('../controller/order.controller.js');
const orderController = new OrderController();

/*
    GET '/orders/:orderId'
    POST '/orders/:orderId'
    PUT '/orders/:orderId?quantity=:quantity&id=:productId'
    DELETE 'orders/:orderId?id=:productId'
*/

router.route('/:orderId')
.get(auth.verify,orderController.getOrder)
.post(auth.verify,orderController.createOrder)
.put(auth.verify,orderController.updateOrder)
.delete(auth.verify,orderController.deleteOrder)

module.exports = router;