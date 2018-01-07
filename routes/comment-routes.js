// const express          = require('express');
// const RideModel        = require('../models/rides-model');
// const CommentModel     = require ('../models/comment-model')
// const multer           = require('multer');
// const router           = express.Router();
// const mongoose         = require('mongoose');
//
// const myUploader       = multer({dest: __dirname + '/../public/uploads/'});
//
//
//
// router.post('/api/rides/:id/comment', (req, res, next) => {
//   const theComent = new CommentModel({
//     user: req.user._id,
//     rideId: req.params.id,
//     content: req.body.commentContent
//   });
//   theComent.save((err) => {
//     if(err && theComent.errors === undefined) {
//       res.status(500).json({ message: 'something went wrong in the data base'});
//       return;
//     }
//     //Validation error
//     if(err && theComent.errors) {
//       res.status(400).json({
//         contentError: theComent.errors.review,
//         userError:    theComent.errors.user
//       });
//       return;
//     }
//     //Put the full user info here for Angular
//     req.user.Password = undefined;
//     theComent.user = req.user;
//     //SUCCESS
//     res.status(200).json(theComent);
//   })//close the comment.save
// });//close router.post('/api/ride/:id/comment')
//
// module.exports = router;
