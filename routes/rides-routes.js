const express = require('express');
const mongoose = require('mongoose');
const Rides = require('../models/rides-model');
const User = require ('../models/user-model');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();


/*post new ride*/

 // ......>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 router.post('/api/rides', (req, res, next) => {
   if (!req.user) {

         res.status(401).json({ message: 'dude you haven log ig how are you gonna create a ride pssss' });
         return;
       }
    const ride = new Rides({
     name: req.body.name,
     date: req.body.date,
     owner: req.user._id,
     category: req.body.category,
     distance: req.body.distance,
     participant:req.body.participant,
     // map: `/uploads/${req.file.filename}`,
    });

// if (req.file) {
//         theCamel.picture = '/uploads/' + req.file.filename;
//       }

ride.save((err) => {
        // Unknown error from the database
        if (err && ride.errors === undefined) {
          res.status(500).json({ message: 'you cant safe any ride' });
          return;
        }
        // Validation error
                if (err && ride.errors) {
                  res.status(400).json({
                    nameError: ride.errors.name,
                    dateError: ride.errors.date,
                    categoryError: ride.errors.category,
                  distanceError: ride.errors.distance,
                        participantError: ride.errors.participant
                  });
                  return;
                }
                // Put the full user info here for Angular
        req.user.password = undefined;
        ride.owner = req.user;
        // Success!
        res.status(200).json(theCamel);

      });
    });

    /* GET rides listing. */
    router.get('/api/rides', (req, res, next) => {
      ;
      if (!req.user) {
        console.log("user not authorize");
        res.status(401).json({ message: 'you have to login to see your rides' });
        return;
      }
      ride
      .find()
      // retrieve all the info of the owners (needs "ref" in model)
      .populate('user', { Password: 0 })
      // don't retrieve "encryptedPassword" though
      .exec((err, rideList) => {
        if (err) {
          res.status(500).json({ message: 'cant find any ride' });
          return;
        }

        res.status(200).json(rideList);
      });
    }); // close router.get('/api/camels', ...


/* GET a single ride. */

  router.get('/api/rides/:id', ensureLoggedIn('/api/rides'), (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    Rides.findById(req.params.id, (err, ride) => {
        if (err) {
          res.json(err);
          return;
        }

        res.json(ride);
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
