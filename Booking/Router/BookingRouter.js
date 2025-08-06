const express = require('express');
const router = express.Router();
const {checkAvailability,AddBooking} = require('../Controler/BookingController')

router.route('/getAvilablity/:barberId').get(checkAvailability)   //not completed
router.route('/BookNow').post(AddBooking) // normal curd operation just add data to db

module.exports = router;
