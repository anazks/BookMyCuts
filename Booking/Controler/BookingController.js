const Decoder = require('../../TokenDecoder/Decoder')
const {checkAvailble,bookNow,bookingCompletion} = require('../UseCause/BookingUseCause')
const {mybooking,findDashboardIncomeFuncion} = require('../Repo/BookingRepo')
const RazorPay = require('../../Razorpay/RazorpayConfig')
const mongoose = require('mongoose');
const { trace } = require('../Router/BookingRouter');
const crypto = require('crypto'); // CommonJS

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

const verifyPayment = async (req, res) => {
    console.log("verify payment started...");
    console.log("Request body:", req.body);
    
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            paymentType,
            amount,
            bookingId
        } = req.body;
        let Details = req.body

        // Validate required fields
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing required payment verification fields'
            });
        }
        // Create signature verification string
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;
        console.log("Signature verification:", isAuthentic);
        console.log("Expected signature:", expectedSignature);
        console.log("Received signature:", razorpay_signature);

        if (!isAuthentic) {
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed - Invalid signature'
            });
        }else{
            
            let response = await bookingCompletion(Details)
            console.log(response,"booking controller response after pay")
            return res.status(200).json({
            success: true,
            message: 'Payment verification successful',
            data: {
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                amount: amount,
                paymentType: paymentType
            }
        });
        }
 
      
    } catch (error) {
        console.log("Payment verification error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during payment verification',
            error: error.message
        });
    }
}; 




const getMybooking = async (req, res) => {
    try {
        let token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
        let decodedValue = await Decoder(token);
        console.log(decodedValue, "decodedValue");
        let userId = decodedValue.id; // Assuming the user ID is in the decoded token
        let bookings = await mybooking(userId)
        console.log(bookings,"my bookings...")
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

module.exports = {checkAvailability,AddBooking,getMybooking,createOrder,findDashboardIncome,verifyPayment}


