const router = require('express').Router();
const LogController = require('../controller/log.controller.js');
const logController = new LogController();
const { auth } = require('../middleware/auth.js');

/*
    http://www.naver.com/users/3?group=seven
*/

router.route()
