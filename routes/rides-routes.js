const express = require('express');
const mongoose = require('mongoose');

const Rides = require('../models/rides-model');


const router = express.Router();


/* GET rides listing. */
// router.get('/showRides', (req, res, next) => {
//   Phone.find((err, rideList) => {
//     if (err) {
//       res.json(err);
//       return;
//     }
//     res.json(rideList);
//   });
// });

/*post new ride*/
router.post('/rides', function(req, res) {
  const phone = new Phone({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    distnace: req.body.distnace,
    // map: `/uploads/${req.file.filename}`,

  });

  rides.save((err) => {
    if (err) {
      res.status(500).json({ message: 'somthing went wrong'});
    }

    return res.json({
      message: 'New ride created!',
      ride: ride
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

/* EDIT a Phone. */
router.put('/ridess/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    distnace: req.body.distnace,
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
router.delete('/rides/:id', (req, res) => {
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
