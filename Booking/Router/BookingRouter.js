const express = require('express');
const router = express.Router();
const {checkAvailability,AddBooking,createOrder} = require('../Controler/BookingController');
const { verifyToken } = require('../../Middlewares/AuthMiddleWares/AuthMiddleWare');

router.route('/getAvilablity/:barberId').get(checkAvailability)   //not completed
router.route('/BookNow').post(AddBooking) // normal curd operation just add data to db

router.route('/create-order').post(verifyToken,createOrder)

module.exports = router;
