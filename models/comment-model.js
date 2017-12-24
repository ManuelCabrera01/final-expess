const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require ('./user-model');
// const Rides = require ('./rides-model');
// const ObjectId   = require('mongoose').Types.ObjectId;

const commentsSchema = new Schema(
  {
    autor:     {type: Schema.Types.ObjectId, ref: 'User',  },
    rides:     {type: Schema.Types.ObjectId, ref:  'Rides',  },
    paragraph: {type: String, required: [true, " you have to ride something dude"]},
     date:     {type: Date },
  });

commentsSchema.methods.belongsTo = function(user){
  return this.autor.equals(user._id);
}
const Comments = mongoose.model('Comments', commentsSchema);
module.exports = Comments;
