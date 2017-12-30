const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment   = require('moment');
// const ObjectId   = require('mongoose').Types.ObjectId;

const ridesSchema = new Schema({
    name:       {type: String, required: [true, "Name is required"]},
    distance:   {type: Number,required: [true, "Distance is required"]},
    user:      {type: Schema.Types.ObjectId, ref: 'User'},
    position:   {type: Number },
    date:       {type: Date},
    category:   {type: String,},
    participant:{type: Number,},
    map:        {type: String},
    comment:   [{type: Schema.Types.ObjectId, 'default': [], ref: 'Comments' }]
  },
  {
  timestamps: {
      createdAt: "dateAdded",
      updatedAt: "dateUpdated"
      }
  });


// ridesSchema.methods.belongsTo = function(user){
//   return this.owner.equals(user._id);
// }

ridesSchema.virtual('timeRemaining').get(function(){
  let remaining = moment(this.date).fromNow(true).split(' ');
  let [days, unit] = remaining;
  return { days, unit };
});

ridesSchema.virtual('inputFormattedDate').get(function(){
  return moment(this.date).format('MM-DD-YYYY');
});
const RideModel = mongoose.model("Ride", ridesSchema);

module.exports = RideModel;
// testing testing
