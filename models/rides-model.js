const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ridesSchema = new Schema(
  {
  name: {
      type: String,
      required: [true, "Name is required"]
    },
    date: {
      type: Date
      // required: [true, "Date is required"]
    },
    category: {
    type: String,
    },
    distance: {
    type: Number, default: '0',
    required: [true, "Distance is required"]
    },
   map:{
  type: String
   }
  },
  //Schema constructor setting
  {
    timestamps: {
      createdAt: "dateAdded",
      updatedAt: "dateUpdated"
    }
  }
);

const Rides = mongoose.model("Rides", ridesSchema);

module.exports = Rides;
