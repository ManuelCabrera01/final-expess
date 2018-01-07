const express = require('express');
const CommentModel = require('../models/comment-model');
const RideModel = require('../models/rides-model');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');

const myUploader = multer({dest: __dirname + '/../public/uploads/'});

/*-------------------post new ride-----------------*/
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
                if (err && theRide.errors) {
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


//---------------------------POST new comment--------------------------
router.post('/api/rides/:id/comment', (req, res, next) => {
  const theComent = new CommentModel({
    user: req.user._id,
    rideId: req.params.id,
    content: req.body.commentContent
  });
  theComent.save((err) => {
    if(err && theComent.errors === undefined) {
      res.status(500).json({ message: 'something went wrong in the data base'});
      return;
    }
    //Validation error
    if(err && theComent.errors) {
      res.status(400).json({
        contentError: theComent.errors.review,
        userError:    theComent.errors.user
      });
      return;
    }
    //Put the full user info here for Angular
    req.user.Password = undefined;
    theComent.user = req.user;
    //SUCCESS
    res.status(200).json(theComent);
  });//close the comment.save
});//close router.post('/


    /*----------------------- GET rides listing.------------------- */
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


/*----------------GET a single ride and tbe comment ------------------- */

  router.get('/api/rides/:id', (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    RideModel
    .findById(req.params.id, (err, theRide) => {
      if(err) { return next(err); }
    })// retrieve all the info of the owners (needs "ref" in model)
    .populate('user', { Password: 0 })
    .exec((err, TheRide) => {
      if (err) {
        res.status(500).json({ message: 'cant find any ride' });
        return;
      }
      CommentModel
         .find({rideId: req.params.id}, (err, theComment) => {
           if (err) {return next(err); }
         })
         .populate('user', {password: 0 })
         .exec((err, theComment) => {
           if(err) {return next(err);}
           const rideAndComment = {
             ride: theRide ,
             comment: theComment
           };
           res.status(200).json(rideAndComment);
         });
       });
     });



/* EDIT a Rides. */
  router.put('/api/rides/:id/edit', (req, res) => {
    console.log("iIIIIIITSSSSSS HEREEEEE");
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {

      res.status(400).json({ message: 'Specified id is not valid' });
      return;
      // console.log(ride.id);
    }

    const updates = {
      name: req.body.rideName,
      date: req.body.rideDate,
      category: req.body.rideCategory,
      distnace: req.body.rideDistnace,
      comment:req.body.rideComment,
    // map: `/uploads/${req.file.filename}`,
    };

    RideModel.findByIdAndUpdate(req.params.id, updates, (ride, err) => {
      if (err) {

        res.json(err);
        return;
      }

      res.json(ride
        // message: 'Ride change have been save'
      );
    });
  });

// **** delete rides
  router.delete('/api/rides/:id', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    RideModel.remove({ _id: req.params.id }, (err) => {
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
