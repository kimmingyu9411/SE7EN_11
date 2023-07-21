const router = require('express').Router();
const {auth} = require('../middleware/auth.js');
const CartController = require('../controller/cart.controller.js');
const cartController = new CartController();

/*
    GET '/cart'
    POST '/cart?id=:productId'
    PUT '/cart?id=:productId'
    DELETE '/cart'
*/

router.route('/')
.get(auth.verify,cartController.getCart)
.post(auth.verify,cartController.insertProductToCart)
.put(auth.verify,cartController.updateCart)
.delete(auth.verify,cartController.deleteCart)

module.exports = router;