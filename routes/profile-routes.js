const express = require('express');
const mongoose = require('mongoose');
const User = require ('../models/user-model');
const Rides = require ('../models/rides-model');
const Comment = require('../models/comment-model');
const multer = require('multer');



// const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();

const myUploader = multer({dest: __dirname + '/../public/uploads/'});

// get the user information including rides and comment
router.get('/api/profile/:id', (req, res, next) => {
  Rides
  .find({user: req.params.id}, (err, ride) => {
    if(err) {return next(err); }
  })

  .populate('user')
   .exec((err, ride) => {
     if(err) {
       res.status(500).json({ message: 'Could not find the recipe'});
       return;
     }
     res.status(200).json(ride)
   })
 })

 // EDIT user. */
  router.put('/api/profile/:id/edit', myUploader.single('RidePicture'), (req, res) => {
    console.log("iIIIIIITSSSSSS HEREEEEE");
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {

      res.status(400).json({ message: 'Specified id is not valid' });
      return;
      // console.log(ride.id);
    }

    const updates = {
      username: req.body.updateUsername,
      date: req.body.updateDate,
      category: req.body.updateCategory,
      distnace: req.body.updateDistnace,
      picture: `/uploads/${req.file.filename}`,
    };

    UserModel.findByIdAndUpdate(req.params.id, updates, (user, err) => {
      if (err) {

        res.json(err);
        return;
      }

      res.json(user);
        // message: 'Ride change have been save'

    });
  });


//edit user information
// router.put('/api/profile/:id',  myUploader.single('profilePicture'),
//   (req, res, next) => {
//     if(!req.user) {
//       res.status(401).json({ message: 'Log in to make any change in your profile'});
//       return;
//     }
//     const updates =  user({
//       name: req.body.userName,
//       email: req.body.userCategory,
//       picture:`/uploads/${req.file.filename}`,
//     });
//
//     User.findByIdAndUpdate(req.params.id, updates, (err) => {
//     if (err) {
//       res.json(err);
//       return;
//     }
//
//     res.json({
//       message: 'user info updated successfully'
//     });
//   });
// });


//delelt User



// router.delete('api/profile/:id', (req, res) => {
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }
//
//   User.remove({ _id: req.params.id }, (err) => {
//     if (err) {
//       res.json(err);
//       return;
//     }
//
//     return res.json({
//       message: 'your no longer exit in the cycling-catch universe!'
//     });
//   })
// });


module.exports = router
