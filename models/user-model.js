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
    { type:Boolean, required: true },

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
