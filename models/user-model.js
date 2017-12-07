const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    image: {
    type: String, default: ''
    },
    category:{
      type: String,
      require :[true ,"please introduce a category"]
    },
    sessions:{
      type: Number
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

const User = mongoose.model("User", userSchema);

module.exports = User;
