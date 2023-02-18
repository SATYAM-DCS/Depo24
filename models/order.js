const mongoose = require("mongoose");


const productSchema = mongoose.Schema(
  {
    '#': {
      type: String,
      require: true,
      unique: true,
    },
    ItemsAndDescription: {
      type: String,
      require: true,  
    },
    rate: {
      type: Number,
      require: true,
    },
    Discount: {
      type: String,
      required: true
    },
    hsn_sac: {
      type: Number,
      require: true,
    },
   
    Qty: {
      type: String,
      require: true,
    },
    CGSTper: {
    type: String,
    required: true
  },
    CGSTamt: {
    type: String,
    required: true
  },
    SGSTper: {
    type: String,
    required: true
  },
    SGSTamt: {
    type: String,
    required: true
  },
    Amount: {
    type: String,
    required: true
  },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);