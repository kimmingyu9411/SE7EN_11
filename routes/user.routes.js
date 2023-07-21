const router = require('express').Router();
const {auth} = require('../middleware/auth.js');
const UserController = require('../controller/user.controller.js');
const userController = new UserController();

/*
    GET '/users/me' 개인 정보 조회
    POST '/users/signup' 회원 가입
    POST '/users/login' 로그인
    PUT '/users/:userId' 정보 수정
    DELETE 'users/:userId' 회원 탈퇴
*/

router.post('/signup',userController.createUser)
router.post('/login',userController.loginUser)

router.get('/me',auth.verify,userController.profile);

router.route('/:userId')
.put(auth.verify,userController.updateUser)
.delete(auth.verify,userController.deleteUser)

module.exports = router;