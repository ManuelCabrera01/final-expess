const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment   = require('moment');

const ridesSchema = new Schema(
  {
  name: {
      type: String,
      required: [true, "Name is required"]
    },

    date: {
      type: Date
    },

    category: {
    type: String,
    },

    distance: {
    type: Number,
    required: [true, "Distance is required"]
    },
// comment
    user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  participant:{
    type:Number,
  },

   map:{
  type: String
   }

  },

  {
    timestamps: {
      createdAt: "dateAdded",
      updatedAt: "dateUpdated"
    }
  }
);
ridesSchema.methods.belongsTo = function(user){
  return this.user.equals(user._id);
}

ridesSchema.virtual('timeRemaining').get(function(){
  let remaining = moment(this.deadline).fromNow(true).split(' ');
  let [days, unit] = remaining;
  return { days, unit };
});

ridesSchema.virtual('inputFormattedDate').get(function(){
  return moment(this.deadline).format('YYYY-MM-DD');
});
const Rides = mongoose.model("Rides", ridesSchema);

module.exports = Rides;
// testing testing
