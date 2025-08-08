const mongoose = require('mongoose');

// Service Schema
const ServiceSchema = new mongoose.Schema(
  {
    ServiceName: {
      type: String,
      required: true,
      trim: true, // Removes extra whitespace
    },
    Rate: {
      type: String,
      required: true,
      min: 0, // Ensures rate is a positive number
    },
    shopId: {
      type: String,
      required: true,
    },
    shoperId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Service model
const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
