const Decoder = require('../../TokenDecoder/Decoder')
const {checkAvailble,bookNow} = require('../UseCause/BookingUseCause')

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



module.exports = {checkAvailability,AddBooking}