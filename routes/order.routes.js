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
.get(auth.verify,)
.post(auth.verify)
.put(auth.verify)
.delete(auth.verify)

module.exports = router;