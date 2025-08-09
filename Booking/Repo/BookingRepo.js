const BookingModel = require("../Models/BookingModel")
const mongoose = require("mongoose");

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
module.exports.mybooking = async(userId)=>{
    try {
        let bookings = await BookingModel.find({userId: userId})
        return bookings
    } catch (error) {
        console.log(error)
        return error
    }
}
 

module.exports.findDashboardIncomeFuncion = async (userId) => {
  try {
    console.log(userId, "in findDashboardIncomeFuncion");

    let now = new Date();
    let lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    let startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    let endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let result = await BookingModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }
      },
      {
        $facet: {
          lastWeek: [
            {
              $match: {
                bookingTimestamp: { $gte: lastWeekStart, $lte: now }
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$amountPaid" }
              }
            }
          ],
          today: [
            {
              $match: {
                bookingTimestamp: { $gte: startOfDay, $lte: endOfDay }
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$amountPaid" }
              }
            }
          ],
          todayExpectedAmount: [
            {
              $match: {
                bookingTimestamp: { $gte: startOfDay, $lte: endOfDay }
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$remainingAmount" } // changed from expectedAmount
              }
            }
          ]
        }
      }
    ]);

    return {
      lastWeek: result[0].lastWeek[0]?.total || 0,
      today: result[0].today[0]?.total || 0,
      todayExpectedAmount: result[0].todayExpectedAmount[0]?.total || 0
    };
  } catch (error) {
    console.error(error);
  }
};
