const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth.js');
const ProductController = require('../controller/product.controller.js');
const productController = new ProductController();

/*
    GET '/products/:productId' 제품 상세 조회
    GET '/products?category=:categoryNum' 카테고리 별 조회
    POST '/products?id=:storeId' 상점 메뉴 등록
    PUT '/products?id=:storeId' 상점 메뉴 수정
    DELETE '/products?id=:storeId' 상점 메뉴 삭제
*/

router.get('/:productId',)

router.route('/')
.get()
.post(auth.verify)
.put(auth.verify)
.delete(auth.verify)

module.exports = router;