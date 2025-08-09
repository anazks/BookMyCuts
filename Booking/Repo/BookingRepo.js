const { response } = require("express")
const BookingModel = require("../Models/BookingModel")
const ShopModel= require('../../Shops/Model/ShopModel')
module.exports.checkBookings = async(data)=>{
    try {
        
    } catch (error) {
        
    }
}
module.exports.addBookings = async(data)=>{
    try {
        let bookings = BookingModel.create(data)
            return bookings
    } catch (error) {
        console.log(error)
        return error
    }
}

  

module.exports.mybooking = async (userId) => {
  try {
    // Step 1: Get completed bookings for the user
    let bookings = await BookingModel.find({
      userId: userId,
      bookingStatus: 'completed'
    }).lean(); // Use lean for plain JS objects (faster, easier to modify)

    // Step 2: Get unique shopIds from the bookings
    const shopIds = [...new Set(bookings.map(b => b.shopId))];

    // Step 3: Fetch shop details for those shopIds
    const shops = await ShopModel.find({
      _id: { $in: shopIds }
    }).lean();

    // Step 4: Create a map for quick lookup
    const shopMap = {};
    shops.forEach(shop => {
      shopMap[shop._id.toString()] = shop;
    });

    // Step 5: Attach shop info to each booking
    const bookingsWithShop = bookings.map(booking => {
      return {
        ...booking,
        shopDetails: shopMap[booking.shopId] || null
      };
    });

    return bookingsWithShop;

  } catch (error) {
    console.log(error);
    return error;
  }
};


module.exports.updateBooking = async (data) => {
  try {
    const { bookingId, razorpay_order_id,amount } = data;

    const response = await BookingModel.findByIdAndUpdate(
      bookingId,
      {
        $set: {
          bookingStatus: "completed",
          paymentId: razorpay_order_id,
          paymentStatus: "paid",
          amountPaid:amount
        }
      },
      { new: true } // returns the updated document
    );

    return response;
  } catch (error) {
    console.error("Error updating booking:", error);
    return null;
  }
};