const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Rides = require ('../models/rides-model')
const User = require ('../models/user-model')

const commentsSchema = new Schema(
  {
    user:       {type: Schema.Types.ObjectId, ref: 'User',  },
    rideId:     {type: Schema.Types.ObjectId, ref:  'Rides',  },
    content:    {type: String, required: [true, " you have to wride something dude"]},
  },{
   timestamps:  {createdAt: "dateAdded",
          }
    });

const Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments;
