const express = require('express');
const { userRegistration,userLogin } = require('../Controllers/AuthController');
const { verifyToken } = require('../../Middlewares/AuthMiddleWares/AuthMiddleWare');
const router = express.Router(); 

router.route('/user/register').post(verifyToken,userRegistration)
router.route('/user/login').post(userLogin)
// router.route('/userLogin').post(userLogin)

module.exports = router;