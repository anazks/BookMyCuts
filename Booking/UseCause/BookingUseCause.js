const {checkBookings,addBookings,updateBooking} = require('../Repo/BookingRepo')
const mongoose = require('mongoose');

module.exports.checkAvailable = async (data) => {
    try {
        let checkByDate = data.Date
        let available = await checkBookings(checkByDate)
        //find  the time is also avaible
    } catch (error) {
        console.log(error);
        return false;
    }
};




module.exports.bookNow = async (data, decodedValue) => {
  try {
    // decodedValue.id is the userId, not the shop
    data.userId = decodedValue.id;

    const startTime = new Date(`${data.bookingDate}T${data.timeSlotStart}:00`);
    const endTime = new Date(`${data.bookingDate}T${data.timeSlotEnd}:00`);

    const bookingData = {
      barberId: new mongoose.Types.ObjectId(data.barberId),
      barberName: data.barberName,
      barberNativePlace: data.barberNativePlace,

      userId: new mongoose.Types.ObjectId(data.userId), // ✅ Fixed
      shopId: data.shopId, // ✅ Keep original string if needed

      serviceIds: data.serviceIds?.map(id => new mongoose.Types.ObjectId(id)) || [],
      services: data.services?.map(service => ({
        id: new mongoose.Types.ObjectId(service.id),
        name: service.name,
        price: service.price,
        duration: service.duration
      })) || [],

      bookingDate: data.bookingDate,
      timeSlotId: data.timeSlotId,
      timeSlotName: data.timeSlotName,
      timeSlotStart: data.timeSlotStart,
      timeSlotEnd: data.timeSlotEnd,

      startTime,
      endTime,

      totalPrice: data.totalPrice,
      totalDuration: data.totalDuration,

      paymentType: data.paymentType,
      amountToPay: data.amountToPay,
      remainingAmount: data.remainingAmount,
      currency: data.currency,

      bookingTimestamp: new Date(data.bookingTimestamp || Date.now()),

      bookingStatus: 'pending',
      paymentStatus: data.paymentType === 'advance'
        ? (data.remainingAmount > 0 ? 'partial' : 'paid')
        : 'unpaid',
      amountPaid: data.paymentType === 'advance' ? data.amountToPay : 0,

      createdAt: new Date()
    };

    console.log(bookingData, "final model-ready data");

    const Booking = await addBookings(bookingData);
    return Booking;

  } catch (error) {
    console.error("Booking error:", error);
    return error;
  }
};

module.exports.bookingCompletion = (data)=>{
    try {
      let response = updateBooking(data)
      return response
    } catch (error) {
        console.log(error)
        return null
    }
}


