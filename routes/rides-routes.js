const express = require('express');
const mongoose = require('mongoose');
const Rides = require('../models/rides-model');
const User = require ('../models/user-model');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();


/* GET rides listing. */
router.get('/api/rides', (req, res, next) => {
  console.log('something');
  Rides.find((err, rideList) => {
    if (err) {
      res.json(err);
      return;
      }
        User.find().populate('rides');
        res.json(rideList);
      });
    });
/*post new ride*/

 // ......>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 router.post('/api/rides', ensureLoggedIn('/api/login'), (req, res, next) => {

    const ride = new Rides({
     name: req.body.name,
     date: req.body.date,
     owner: req.user._id,
     category: req.body.category,
     distance: req.body.distance,
     participant:req.body.participant,
     // map: `/uploads/${req.file.filename}`,
    });
// const ownerId = req.user._id;

  ride.save( (err) => {

      if (err) {
    return res.status(500).json({ message: err})

        }
        // User.find()
      //this save it inside user rides so you can see how many rides one user have created
    // Owner.findByIdAndUpdate({ _id: ownerId }, { $push: { rides: ride._id }}).exec();
    // Owner.findByIdAndUpdate({ _id: ownerId }, { $push: { rides: ride.name}}).exec();
  // .populate('rides');
      // aqui------------

      return res.json({
        message: 'New ride created!',
      ride:ride
        });
      });
    });
/* GET a single ride. */
  router.get('/api/rides/:id', ensureLoggedIn('/api/rides'), (req, res) => {
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
  router.put('/api/ride/:id/edit',ensureLoggedIn('/api/login'), (req, res) => {
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
  router.delete('/api/ride/:id', (req, res) => {
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
