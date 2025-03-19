const express = require('express');
const { userRegistration,userLogin,ShopRegister,login,getUsers } = require('../Controllers/AuthController');
const { verifyToken } = require('../../Middlewares/AuthMiddleWares/AuthMiddleWare');
const router = express.Router(); 

router.route('/user/register').post(userRegistration)
router.route('/user/login').post(userLogin)

router.route('/shop/register').post(ShopRegister)
router.route('/shop/login').post(login)
router.route('/getAllUser').get(getUsers)

// router.route('/userLogin').post(userLogin)

module.exports = router;