const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const TYPES    = require('../models/user-type-model');
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "User is required"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    picture: {
    type: String, default: ''
    },
    category: {
    type: String,
    },
    rides:[{
    type: Schema.Types.ObjectId,
    'default': [],
    require: true,
     ref: 'Rides'
   }],
    usertype:
    { type: String,  required: true },

  },
  //Schema constructor setting
  {
    timestamps: {
      createdAt: "dateAdded",
      updatedAt: "dateUpdated"
    }
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

// this is a cut pice of code that allow the user chose betwen primeun
// usertype:
// { type: String, enum: TYPES, required: true },
//
// },
