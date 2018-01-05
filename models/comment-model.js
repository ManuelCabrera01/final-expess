const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require ('./user-model');
// const Rides = require ('./rides-model');
// const ObjectId   = require('mongoose').Types.ObjectId;

const commentsSchema = new Schema(
  {
    user:     {type: Schema.Types.ObjectId, ref: 'User',  },
    rideId:     {type: Schema.Types.ObjectId, ref:  'Rides',  },
    paragraph: {type: String, required: [true, " you have to ride something dude"]},
  },{
   timestamps: {createdAt: "dateAdded",
          }
    });

const Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments;
