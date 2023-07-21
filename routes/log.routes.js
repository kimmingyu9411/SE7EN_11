const router = require('express').Router();
const LogController = require('../controller/log.controller.js');
const logController = new LogController();
const { auth } = require('../middleware/auth.js');

/*
    GET '/logs'

*/

router.route('/')
.get(auth.verify,logController.getLogs)
// .post(auth.verify,logController);

module.exports = router;