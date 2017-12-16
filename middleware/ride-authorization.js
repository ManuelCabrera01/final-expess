// const Ride = require('../models/rides-model.js');
//
// function authorizeRide(req, res, next){
//   Ride.findById(req.params.id, (err, ride) => {
//     // If there's an error, forward it
//     if (err)      { return next(err) }
//     // If there is no campaign, return a 404
//     if (!ride){ return next(new Error('404')) }
//     // If the campaign belongs to the user, next()
//     if (ride.owner.equals(req.user._id)){
//       return next()
//     } else {
//     // Otherwise, redirect
//      return res.json({
//         message: 'everything good',
//
//       });
//     }
//   });
// }
//
// module.exports = authorizeCampaign;
