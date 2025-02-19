const mongoose = require('mongoose');

// Service Schema
const BarabarSchema = new mongoose.Schema(
  {
    
    BarBarName: {
      type: String,
      required: true,
      trim: true // Removes extra whitespace
    },
    From: {
      type: String,
      required: true,
      min: 0 // Ensures rate is a positive number
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Service model
const Barabar = mongoose.model('Barabar', BarabarSchema);
module.exports = Barabar;
