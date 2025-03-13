const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema(
  {
    ShopName: {
      type: String,
      required: true,
      trim: true // Removes extra whitespace
    },
    City: {
      type: String,
      required: true,
      trim: true
    },
    Mobile: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^(\d{10})$/.test(v); // Ensures it's a 10-digit number
        },
        message: props => `${props.value} is not a valid mobile number!`
      }
    },
    Timing: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v); // Regex for URL validation
        },
        message: props => `${props.value} is not a valid website URL!`
      }
    },
    shopId: {
      type: String,
      required: true
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);



const ShopModel = mongoose.model('Shop', ShopSchema);
module.exports = ShopModel;