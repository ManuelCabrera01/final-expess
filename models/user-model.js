const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    username: {type: String, required: [true, "User is required"]  },
    password: { type: String, required: [true, "Password is required"]  },
    email: {type: String,required: true},
    picture: {  type: String, default: ''},
    category: {type: String,  },
    rides:[{type: Schema.Types.ObjectId,  'default': [], ref: 'Rides'}],
    payMembership:  { type: Boolean,default:false },
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
