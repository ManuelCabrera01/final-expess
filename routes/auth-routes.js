const express = require ('express');
const bcrypt  = require ('bcrypt');
const User = require ('../models/user-model');
// const RidesModel = require ('../models/rides-model');
const passport = require('passport');
// const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
// const multer = require('../config/multer');
// const upload     =  ({ dest: 'public/uploads' });
const router = express.Router();






 router.post('/api/signup', (req, res, next) =>{
   if (!req.body.signupUsername|| !req.body.signupPassword){
     // 400 for client errors (user needs to fix something)
     res.status(400).json({message:"provide username and password you silly"});
     return;
   }

   User.findOne(
     {username: req.body.signupUsername},
     (err, userFromDb)=> {
    if(err){
      // 500 for server errors (nothing user can do)
  res.status(500).json({message: 'the username is f**ck'});
  return;
 }

 if (userFromDb){
   // 400 for client errors (user needs to fix something)
   res.status(400).json({message: 'Username already exists'});
   return;
 }
//save to the DB if we didn't find the user
   const salt = bcrypt.genSaltSync(10);
   const thePassword= bcrypt.hashSync(req.body.signupPassword, salt);


   const theUser = new User({
    username: req.body.signupUsername,
    password  : thePassword
 });

 theUser.save((err) => {
   if (err) {
     res.status(500).json({ message: 'somehing went wrong'});
     return;
   }
// Automatically logs them in after the sign up
// (req.login() is defined by passport)
   req.login(theUser,(err)=> {
     if (err) {
                res.status(500).json({ message: 'Login went to 💩' });
                    return;
                  }

     // Clear the password before sending
                  // (not from the database, just from the object)
     theUser.password= undefined;
     // Send the user's information to the frontend
     res.status(200).json(theUser);
   });// close req.login()
 });//close theUser.save()
   });//Usser.findOne()
 });//close POST/signup

//facebook ...................>>>>>>>>>>>>>>>>>>>>>>>
// router.get("/auth/facebook", passport.authenticate("facebook"));
// router.get("/auth/facebook/callback", passport.authenticate("facebook", {
//   successRedirect: "/private-page",
//   failureRedirect: "/"
// }));

//.......................>>>>>>>>>>>>>>>>>>>>>>>>>>




//google+ login
// router.get("/auth/google", passport.authenticate("google", {
//   scope: ["https://www.googleapis.com/auth/plus.login",
//           "https://www.googleapis.com/auth/plus.profile.emails.read"]
// }));
//
// router.get("/auth/google/callback", passport.authenticate("google", {
//   failureRedirect: "/",
//   successRedirect: "/private-page"
// }));

//.....................>>>>>>>>>>>>>>>>>>>>>>>>>>



// tradition login

router.post('/api/login', (req, res, next) => {
  const authenticateFunction =
    passport.authenticate('local', (err, theUser, extraInfo) => {
  // Errors prevented us from deciding if login was a success or failure
  if (err) {
            res.status(500).json({ message: 'Unknown login error ' });
            return;
          }

          // Login failed for sure if "theUser" is empty
          if (!theUser) {
            // "extraInfo" contains feedback messages from LocalStrategy
            res.status(401).json(extraInfo);
            return;
          }

          // Login successful, save them in the session.
          req.login(theUser, (err) => {
              if (err) {
                res.status(500).json({ message: 'Session save error ' });
                return;
              }
    // Clear the password before sending
            // (not from the database, just from the object)
              theUser.password = undefined;
                      // Everything worked! Send the user's information to the client.
            res.status(200).json(theUser);
          });
        });
        authenticateFunction(req, res, next);
      });

      router.post('/api/logout', (req, res, next) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({ message: 'Log out success! ' });
});



router.get('/api/checklogin', (req, res, next) => {
    if (!req.user) {
      res.status(401).json({ message: 'Nobody logged in. ' });
      return;
    }

    // Clear the password before sending
    // (not from the database, just from the object)
    req.user.password = undefined;

    res.status(200).json(req.user);
});


module.exports = router;
