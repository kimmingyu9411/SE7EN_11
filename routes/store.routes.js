const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth.js');
const StoreController = require('../controller/store.controller.js');
const storeController = new StoreController();

/*
    GET '/stores' 전체 상점 조회
    GET '/stores/:storeId' 특정 상점 조회
    POST '/stores' 상점 등록
    PUT '/stores/:storeId' 상점 업데이트
    DELETE '/stores/:storeId' 상점 삭제
*/

router.route('/')
.get()
.post(auth.verify)

router.route('/:storeId')
.get()
.put(auth.verify)
.delete(auth.verify)

module.exports = router;