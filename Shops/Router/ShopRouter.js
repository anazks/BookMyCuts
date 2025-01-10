const express = require('express');
const router = express.Router();
const {AddShop,ViewAllShop,addService,ViewAllServices} = require('../Controller/ShopController')

router.route('/addShop').post(AddShop)
router.route('/ViewAllShop').get(ViewAllShop)

router.route('/addService').post(addService)
router.route('/ViewAllServices').get(ViewAllServices)
module.exports = router;