const express = require('express');
const router = express.Router();
const {AddShop,ViewAllShop,addService,ViewAllServices,addBarber,ViewAllBarbers,viewSigleShop,viewMyService,viewMyBarbers,viewAllBookingOfShops} = require('../Controller/ShopController')
const { verifyToken } = require('../../Middlewares/AuthMiddleWares/AuthMiddleWare');

router.route('/addShop').post(verifyToken,AddShop)
router.route('/ViewAllShop').get(ViewAllShop)
router.route('/viewMyShops').get(verifyToken,viewSigleShop)

router.route('/addService').post(addService)
router.route('/viewMyService/:id').get(viewMyService)
router.route('/ViewAllServices').get(ViewAllServices)

router.route('/addBarber').post(addBarber)
router.route('/ViewAllBarbers').get(ViewAllBarbers)
router.route('/viewMyBarbers/:id').get(viewMyBarbers)
router.route('/viewAllBookingOfShops').get(verifyToken,viewAllBookingOfShops)
router.route

module.exports = router;