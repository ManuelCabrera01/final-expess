const express = require('express');
const RideModel = require('../models/rides-model');
const multer = require('multer');
const router = express.Router();

const myUploader = multer({
  dest: __dirname + '/../public/uploads/'
});

/*post new ride*/

 // ......>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 router.post(
  '/api/rides',
  myUploader.single('RidePicture'), (req, res, next) => {
   if (!req.user) {
         res.status(401).json({ message: 'dude you haven log ig how are you gonna create a ride pssss' });
         return;
       }
    const theRide = new RideModel({
     name: req.body.rideName,
     date: req.body.rideDate,
      user: req.user._id,
     category: req.body.rideCategory,
     distance: req.body.rideDistance,
     participant:req.body.rideParticipant,
     // map: `/uploads/${req.file.filename}`,
    });

    if (req.file) {
        theRide.picture = '/uploads/' + req.file.filename;
      }

      theRide.save((err) => {
        // Unknown error from the database
        if (err && theRide.errors === undefined) {
          res.status(500).json({ message: 'you cant safe any ride' });
          return;
        }
        // Validation error
                if (err && TheRide.errors) {
                  res.status(400).json({
                    nameError: theRide.errors.name,
                    dateError: theRide.errors.date,
                    categoryError: theRide.errors.category,
                    distanceError: theRide.errors.distance,
                    participantError: theRide.errors.participant
                  });
                  return;
                }
                // Put the full user info here for Angular
        req.user.password = undefined;
    theRide.user = req.user;

        // Success!
        res.status(200).json(theRide);
      }); // close theRide.save()
  }); // close router.post('/api/rides', ...

    /* GET rides listing. */
    router.get('/api/rides', (req, res, next) => {

      if (!req.user) {
        console.log("user not authorize");
        res.status(401).json({ message: 'you have to login to see your rides' });
        return;
      }
      RideModel
      .find()
      // retrieve all the info of the owners (needs "ref" in model)
      .populate('user', { Password: 0 })
      // don't retrieve "password" though
      .exec((err, allTheRides) => {
        if (err) {
          res.status(500).json({ message: 'cant find any ride' });
          return;
        }

        res.status(200).json(allTheRides);
      });
    }); // close router.get('/api/camels', ...


/* GET a single ride. */

  router.get('/api/rides/:id', (req, res) => {
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
  router.put('/api/ride/:id/edit', (req, res) => {
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
