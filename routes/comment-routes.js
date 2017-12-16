const express = require('express');
const mongoose = require('mongoose');
const User = require ('../models/user-model');
const RidesModel = require ('../models/rides-model');
const Comment = require('../models/comment-model');
const router = express.Router();
// const ensureLogin = require("connect-ensure-login");

router.post('/comment', function(req, res) {
  const comment = new Comment({
    autor:     req.user.id,
    date:      req.body.date,
    paragraph: req.body.paragraph,
    _rides :req.Rides._id

  });

 comment.save((err) => {
     if (err) {
   return res.send(err);

     }

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
