const express = require('express');
const router = express.Router();
const {AddShop,ViewAllShop,addService,ViewAllServices,addBarber,ViewAllBarbers} = require('../Controller/ShopController')

router.route('/addShop').post(AddShop)
router.route('/ViewAllShop').get(ViewAllShop)

router.route('/addService').post(addService)
router.route('/ViewAllServices').get(ViewAllServices)

router.route('/addBarber').post(addBarber)
router.route('/ViewAllBarbers').get(ViewAllBarbers)
module.exports = router;