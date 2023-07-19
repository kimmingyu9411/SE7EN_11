const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth.js');
const UserController = require('../controller/user.controller.js');
const userController = new UserController();

/*
    GET '/users/me' 개인 정보 조회
    POST '/users' 회원 가입
    PUT '/users/:userId' 정보 수정
    DELETE 'users/:userId' 회원 탈퇴
*/

router.post('/',userController.createUser);

router.get('/me',auth.verify,userController.getUser);

router.route('/:userId')
.put(auth.verify)
.delete(auth.verify)

module.exports = router;