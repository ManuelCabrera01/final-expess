const express = require('express');
const mongoose = require('mongoose');
const Autor = require ('../models/user-model');
const Rides= require ('../models/rides-model');
const Comment = require('../models/comment-model');
const router = express.Router();
// const ensureLogin = require("connect-ensure-login");

router.post('/comment', function(req, res) {
  const comment = new Comment({
    autor     :req.user.name,   // you only need the name of the autor not the entire Object
    date      : req.body.date,
    paragraph :req.body.paragraph,
    _rides    :req.rides._id // yout need to store the comment inside the ride

  });
const _ridesId = req.rides._id
 comment.save((err) => {
     if (err) {
   return res.send(err);

     }
  Rides.findByIdAndUpdate({ _id: _ridesId }, { $push: { comment: ride}}).exec();
     return res.json({
       message: 'this is your comment',
     comment:comment
     });
   });
});

router.delete('/comment/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Comment.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    return res.json({
      message: 'comment deleted you pussy!'
    });
  })
});


module.exports = router
