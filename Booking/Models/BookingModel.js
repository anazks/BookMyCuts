const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: true
  },
  barberName: String,
  barberNativePlace: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  shopId: String, // optional: storing original string ID if needed

  serviceIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  services: [{
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    duration: Number
  }],

  bookingDate: String,
  timeSlotId: Number,
  timeSlotName: String,
  timeSlotStart: String,
  timeSlotEnd: String,

  startTime: Date,
  endTime: Date,

  totalPrice: Number,
  totalDuration: Number,

  paymentType: {
    type: String,
    enum: ['advance', 'full', 'cod']
  },
  amountToPay: Number,
  remainingAmount: Number,
  currency: String,

  bookingTimestamp: {
    type: Date,
    default: Date.now
  },

  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentId:{
    type:String,
    default:"not added"
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid', 'refunded'],
    default: 'unpaid'
  },
  amountPaid: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
