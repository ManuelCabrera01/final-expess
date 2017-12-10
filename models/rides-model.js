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
    },

    category: {
    type: String,
    },

    distance: {
    type: Number,
    required: [true, "Distance is required"]
    },
// comment
    user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  participant:{
    type:Number,
  },

   map:{
  type: String
   }

  },

  {
    timestamps: {
      createdAt: "dateAdded",
      updatedAt: "dateUpdated"
    }
  }
);

const Rides = mongoose.model("Rides", ridesSchema);

module.exports = Rides;
