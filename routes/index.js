const express = require('express');
const cartRouter = require('./cart.routes.js');
const productRouter = require('./product.routes.js');
const reviewRouter = require('./review.routes.js');
const storeRouter = require('./store.routes.js');
const userRouter = require('./user.routes.js');

const router = express.Router();

const defaultRouters = [
    {
        path : '/cart',
        router : cartRouter
    },
    {
        path : '/products',
        router : productRouter
    },
    {
        path : '/reviews',
        router : reviewRouter
    },
    {
        path : '/stores',
        router : storeRouter
    },
    {
        path : '/users',
        router : userRouter
    }
];

defaultRouters.forEach(r=>{
    router.use(r.path,r.router);
});

module.exports=router;