const Decoder = require('../../TokenDecoder/Decoder')
const {checkAvailble,bookNow} = require('../UseCause/BookingUseCause')
const {mybooking,findDashboardIncomeFuncion} = require('../Repo/BookingRepo')
const RazorPay = require('../../Razorpay/RazorpayConfig')
const mongoose = require('mongoose');

const checkAvailability = async(req,res)=>{
    try {
        let availableStatus = await checkAvailble(req.params.id)
        res.json(availableStatus)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

const AddBooking = async (req, res) => {
    try {
        console.log(req.body, "req.body in BookingController");
        let token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
        let decodedValue = await Decoder(token);
        console.log(decodedValue, "decodedValue");
        let BookingStatus = await bookNow(req.body, decodedValue); // Assuming bookNow is async
        console.log(BookingStatus,"BookingStatus")
        return res.status(200).json({ success: true, BookingStatus });
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: error.message || "Unauthorized" });
    }
};

const createOrder = async (req, res) => {
    console.log(req.body)
    try {
    const options = {
      amount: req.body.amount * 100, // convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const order = await RazorPay.orders.create(options);
    console.log(order)
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Order creation failed' });
  }
}




const getMybooking = async (req, res) => {
    try {
        let token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
        let decodedValue = await Decoder(token);
        console.log(decodedValue, "decodedValue");
        let userId = decodedValue.id; // Assuming the user ID is in the decoded token
        let bookings = await mybooking(userId)
        return res.status(200).json({ success: true, bookings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
}

const findDashboardIncome =  async (req, res) => {
    try {
        const shopId = req.params.id
        const dashboardIncome = await findDashboardIncomeFuncion(shopId)
        if(dashboardIncome){
            return res.status(200).json({ 
                success: true,
                message:"successfully fetch dashboard income",
                dashboardIncome
             });
        }else{
            return res.status(404).json({
                success: false,
                
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:"internal error"
        })
    }
}

module.exports = {checkAvailability,AddBooking,getMybooking,createOrder,findDashboardIncome}

