const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment   = require('moment');
const ObjectId   = require('mongoose').Types.ObjectId;

const ridesSchema = new Schema({
    name:       {type: String, required: [true, "Name is required"]},
    date:       {type: Date},
    category:   {type: String,},
    distance:   {type: Number,required: [true, "Distance is required"]},
    owner:      {type: Schema.Types.ObjectId, ref: 'User', require: true  },
    participant:{type:Number,},
    map:        {type: String},
    comment:   [{type: Schema.Types.ObjectId, 'default': [],require: true, ref: 'Comments' }]},
  {
  timestamps: {
      createdAt: "dateAdded",
      updatedAt: "dateUpdated"
      }
  });


ridesSchema.methods.belongsTo = function(user){
  return this.user.equals(user._id);
}

ridesSchema.virtual('timeRemaining').get(function(){
  let remaining = moment(this.date).fromNow(true).split(' ');
  let [days, unit] = remaining;
  return { days, unit };
});

ridesSchema.virtual('inputFormattedDate').get(function(){
  return moment(this.date).format('YYYY-MM-DD');
});
const Rides = mongoose.model("Rides", ridesSchema);

module.exports = Rides;
// testing testing
