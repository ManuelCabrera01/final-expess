const express = require('express');
const mongoose = require('mongoose');
const User = require ('../models/user-model');
const Rides = require ('../models/rides-model');
const Comment = require('../models/comment-model');
// const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const router = express.Router();

const myUploader = multer({dest: __dirname + '/../public/uploads/'});

// get the user information including rides and comment
router.get('/api/profile/', (req, res, next) => {
Rides
.find({user: req.params.id}, (err, theRide) => {
  if(err) {return next(err); }
})
.populate('user', {password : 0})
.exec((err, theRide) => {
  if(err) {
    res.status(500).json({ message: 'unable to find ride😡'});
    return;
  }
  res.status(200).json(theRide)
});
});


//edit user information
router.put('/api/profile/:id',  myUploader.single('profilePicture'),
  (req, res, next) => {
    if(!req.user) {
      res.status(401).json({ message: 'Log in to make any change in your profile'});
      return;
    }
    const updates = new RecipeModel({
      name: req.body.userName,
      email: req.body.userCategory,
      picture:`/uploads/${req.file.filename}`,
    });

    User.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'user info updated successfully'
    });
  });
});


//delelt User



router.delete('api/profile/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'your no longer exit in the cycling-catch universe!'
    });
  })
});


module.exports = router
