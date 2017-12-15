const express = require('express');
const mongoose = require('mongoose');
const Rides = require('../models/rides-model');
const ensureLogin = require("connect-ensure-login");

const router = express.Router();


/* GET rides listing. */
router.get('/ridePage', (req, res, next) => {
  Rides
      .find({})
      .populate('_user')
      .exec((err, rides) => {
        res.json({
          message: 'all the ries!',
      });
});
});
/*post new ride*/
// .........>



 // ......>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.post('/rides' , ensureLogin.ensureLoggedIn(),function (req, res)  {
  // Rides.findOne({ owner: req.user._id }),
  const ride = new Rides({
    owner : req.user._id,
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    distance: req.body.distance,
    participant:req.body.participant,
    comment:req.body.comment,

  });

  ride.save((err) => {

    if (err) {
      return res.status(500);


    }

    return res.json({
      message: 'New ride created!',

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
})
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
