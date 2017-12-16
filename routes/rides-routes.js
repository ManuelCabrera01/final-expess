const express = require('express');
const mongoose = require('mongoose');
const Rides = require('../models/rides-model');
const owner = require ('../models/user-model');
// const ensureLogin = require("connect-ensure-login");

const router = express.Router();


/* GET rides listing. */
router.get('/rides', (req, res, next) => {
  Rides.find((err, rideList) => {
    if (err) {
      res.json(err);
      return;
    }
        res.json(rideList);
      });
});
/*post new ride*/

 // ......>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 router.post('/rides', function(req, res) {
   
   const ride = new Rides({
     name: req.body.name,
     date: req.body.date,
     owner: req.user._id,
     category: req.body.category,
     distance: req.body.distance,
     participant:req.body.participant,
     // map: `/uploads/${req.file.filename}`,
   });
  ride.save( (err) => {

      if (err) {
    return res.status(500).json({ message: err})

      }

      return res.json({
        message: 'New ride created!',
      ride:ride
      });
    });
});
/* GET a single ride. */
router.get('/ride/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Rides.findById(req.params.id, (err, theRide) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json(theRide);
    });
});

/* EDIT a Rides. */
router.put('/ride/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    distnace: req.body.distnace,
    comment:req.body.comment,
    // map: `/uploads/${req.file.filename}`,
  };

  Rides.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Ride change have been save'
    });
  });
});

// **** delete rides
router.delete('/ride/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Rides.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'Ride has been deleted!'
    });
  })
});
module.exports = router;
