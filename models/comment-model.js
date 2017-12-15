const commentsSchema = new Schema(
  {
comment: {
      type: String,
      required: [true, "Name is required"]
    },

    date: {
      type: Date
    },

    dude: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },




  },

);
CommentsSchema.methods.belongsTo = function(user){
  return this.user.equals(user._id);
}
module.exports = Comments;
