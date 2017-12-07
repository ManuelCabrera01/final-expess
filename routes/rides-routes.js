const express = require('express');
const mongoose = require('mongoose');

const Rides = require('../models/rides-model');
const upload = require('../configs/multer');

const router = express.Router();



// router.get('/showRides', (req, res, next) => {
//   Phone.find((err, rideList) => {
//     if (err) {
//       res.json(err);
//       return;
//     }
//     res.json(rideList);
//   });
// });


router.post('/rides', upload.single('file'), function(req, res) {
  const phone = new Phone({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    distnace: req.body.distnace,
    // map: `/uploads/${req.file.filename}`,

  });

  rides.save((err) => {
    if (err) {
      return res.send(err);
    }

    return res.json({
      message: 'New ride created!',
      ride: ride
    });
  });
});
