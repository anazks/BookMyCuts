const express = require('express');
const router = express.Router();

const {checkAvailability,AddBooking,createOrder,getMybooking,findDashboardIncome,verifyPayment} = require('../Controler/BookingController');
const { verifyToken } = require('../../Middlewares/AuthMiddleWares/AuthMiddleWare');

// const {checkAvailability,AddBooking,getMybooking} = require('../Controler/BookingController')
router.route('/getAvilablity/:barberId').get(checkAvailability)
router.route('/BookNow').post(AddBooking)
router.route('/myBookings').post(getMybooking) // Assuming this is for adding bookings




router.route('/getAvilablity/:barberId').get(checkAvailability)   //not completed
router.route('/BookNow').post(AddBooking) // normal curd operation just add data to db


router.route('/create-order').post(verifyToken,createOrder)
router.route('/verifyPayment').post(verifyToken,verifyPayment)

router.route('/dashboardIncome/:id').get(findDashboardIncome)

module.exports = router;
