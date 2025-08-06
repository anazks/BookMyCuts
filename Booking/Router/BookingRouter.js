const express = require('express');
const router = express.Router();
const {checkAvailability,AddBooking,getMybooking} = require('../Controler/BookingController')
router.route('/getAvilablity/:barberId').get(checkAvailability)
router.route('/BookNow').post(AddBooking)
router.route('/myBookings').post(getMybooking) // Assuming this is for adding bookings

module.exports = router;
