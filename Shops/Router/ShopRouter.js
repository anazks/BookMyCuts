const express = require('express');
const router = express.Router();
const {AddShop} = require('../Controller/ShopController')

router.route('/addShop').post(AddShop)

module.exports = router;