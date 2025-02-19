const express = require('express');
const router = express.Router();
const {AddShop,ViewAllShop,addService,ViewAllServices,addBarber,ViewAllBarbers,viewSigleShop} = require('../Controller/ShopController')

router.route('/addShop').post(AddShop)
router.route('/ViewAllShop').get(ViewAllShop)
router.route('/viewSigleShop').post(viewSigleShop)

router.route('/addService').post(addService)
router.route('/ViewAllServices').get(ViewAllServices)

router.route('/addBarber').post(addBarber)
router.route('/ViewAllBarbers').get(ViewAllBarbers)
module.exports = router;