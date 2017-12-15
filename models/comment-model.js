const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require ('./user-model');
const Rides = require ('./rides-model');
const ObjectId   = require('mongoose').Types.ObjectId;

const commentsSchema = new Schema(
  {
    autor:   {type: Schema.Types.ObjectId,mref: 'User',  require: true},
    _rides:  {type: Schema.Types.ObjectId, ref: 'Rides',  require: true},
    content: {type: String, required: [true, "Name is required"]},
     date:   {type: Date },
  });

CommentsSchema.methods.belongsTo = function(user){
  return this.user.equals(user._id);
}
const Comment = mongoose.model('Comment', CommentsSchema);
module.exports = Comments;
