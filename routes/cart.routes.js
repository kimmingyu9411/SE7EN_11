const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth.js');
const CartController = require('../controller/cart.controller.js');
const cartController = new CartController();

/*
    GET '/cart'
    POST '/cart?id=:productId'
    PUT '/cart/:orderId?quantity=:quantity&id=:productId'
    DELETE 'cart/:orderId?id=:productId'
*/

router.route('/')
.get(auth.verify,cartController.getCart)
.post(auth.verify,cartController.insertProductToCart)
.put(auth.verify,cartController.updateOrder)
.delete(auth.verify,cartController.deleteOrder)

module.exports = router;