const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    username:              {type: String, required:true },
    password:              {type: String, required:true  },
    email:                 {type: String},
    picture:               {type: String, default: ''},
    category:              {type: String,  },
    payMembership:         {type: Boolean,default:false },
//social login
    facebookID: String,
   googleID: String
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
