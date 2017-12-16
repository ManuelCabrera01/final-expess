const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require ('./user-model');
// const Rides = require ('./rides-model');
// const ObjectId   = require('mongoose').Types.ObjectId;

const commentsSchema = new Schema(
  {
    // autor:     {type: Schema.Types.ObjectId,mref: 'User',  },
    // _rides:    {type: Schema.Types.ObjectId, ref: 'Rides',  },
    paragraph: {type: String, required: [true, " you have to ride something dude"]},
     date:     {type: Date },
  });

// CommentsSchema.methods.belongsTo = function(user){
//   return this.user.equals(user._id);
// }
const Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments;
