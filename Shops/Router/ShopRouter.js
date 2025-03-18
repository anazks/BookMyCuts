const express = require('express');
const router = express.Router();
const {AddShop,ViewAllShop,addService,ViewAllServices,addBarber,ViewAllBarbers,viewSigleShop,viewMyService,viewMyBarbers} = require('../Controller/ShopController')

router.route('/addShop').post(AddShop)
router.route('/ViewAllShop').get(ViewAllShop)
router.route('/viewSigleShop').post(viewSigleShop)

router.route('/addService').post(addService)
router.route('/viewMyService:/id').get(viewMyService)
router.route('/ViewAllServices').get(ViewAllServices)

router.route('/addBarber').post(addBarber)
router.route('/ViewAllBarbers').get(ViewAllBarbers)
router.route('/viewMyBarbers/:id').get(viewMyBarbers)
module.exports = router;