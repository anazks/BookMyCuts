const express = require('express');
const router = express.Router();
const {checkAvailability,AddBooking} = require('../Controler/BookingController')
router.route('/getAvilablity/:barberId').get(checkAvailability)
router.route('/BookNow').post(AddBooking)

module.exports = router;
