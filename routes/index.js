import express from 'express';
import * as orderRouter from './order.routes.js';
import * as productRouter from './product.routes.js';
import * as reviewRouter from './review.routes.js';
import * as storeRouter from './store.routes.js';
import * as userRouter from './user.routes.js';

const defaultRouters = [
    {
        path : '/orders',
        router : orderRouter
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

export const router = express.Router();