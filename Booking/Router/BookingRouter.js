const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const {checkAvailability,AddBooking,getMybooking} = require('../Controler/BookingController')
router.route('/getAvilablity/:barberId').get(checkAvailability)
router.route('/BookNow').post(AddBooking)
router.route('/myBookings').post(getMybooking) // Assuming this is for adding bookings
=======
const {checkAvailability,AddBooking} = require('../Controler/BookingController')

router.route('/getAvilablity/:barberId').get(checkAvailability)   //not completed
router.route('/BookNow').post(AddBooking) // normal curd operation just add data to db
>>>>>>> fa17187af49c3b6fe0fbeb9ed04dde87b1f66d3b

module.exports = router;
