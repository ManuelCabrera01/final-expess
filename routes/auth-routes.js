const express = require ('express');
const bcrypt  = require ('bcrypt');
const User = require ('../models/user-model');
const RidesModel = require ('../models/rides-model');
const passport = require('passport');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
// const multer = require('../config/multer');
// const upload     =  ({ dest: 'public/uploads' });
const router = express.Router();






 router.post('/api/signup', (req, res, next) =>{
   const username   = req.body.username; //username from the user model schema = username from the form
   const password   = req.body.password;
   const email      = req.body.email;
   const picture    = req.body.picture;
   const category   = req.body.category;
   const rides      = req.body.rides;
   const payMembership   = req.body.payMembership;

   if (!username || !password){
     res.status(400).json({message:"provide username and password"});
     return;
  }
   User.findOne({username:username}, '_id', (err,foundUser)=> {
    if(foundUser){
  res.status(400).json({message: 'the user name already exits'});
  return;
 }
//save to the DB if we didn't find the user
   const salt = bcrypt.genSaltSync(10);
   const hashPass= bcrypt.hashSync(password, salt);


   const theUser = new User({
    username:         username,
    password:         hashPass,
    email:            email,
    category:         category,
    rides:            rides,
    picture:          picture,
    payMembership:    payMembership

 });
// new change
 theUser.save((err) => {
   if (err) {
     res.status(500).json({ message: 'somehing went wrong'});
     return;
   }

   req.login(foundUser,(error)=> {
     theUser.password= undefined;
     res.status(200).json(theUser);
   });
     });//theUset.save()
   });//USser.find
 });//GET/signup

//facebook login
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/private-page",
  failureRedirect: "/"
}));

//.......................




//google+ login
router.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));

router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/",
  successRedirect: "/private-page"
}));

//.....................



// tradition login

  router.post('/api/login', ensureLoggedOut() , (req, res, next )=> {
const username = req.body.username;
const password = req.body.password;

User.findOne ({username: username }, (err, foundUser)=> {
if (!foundUser ){
  res.status(400).json({message: 'incorrect username'});
  return;

}

if (!bcrypt.compareSync(password, foundUser.password)) {
  res.status(400).json({massage:"incorretc pasword"});
  return;
}
req.login(foundUser, (err) => {
  foundUser.password = undefined;
  res.status(200).json(foundUser);
});

// return new Promise((resolve, reject) => {
//             RidesModel.populate(rides, 'user')
//                 .then((_rides) => {
//                     _.forEach(rides, (rides) => {
//                         rides.user = _.orderBy(rides.user, ['position','title','_id']);
//                     });
//                     return res.json( lists );
//                 })
//                 .catch((error) => res.status(400).json({ message: 'impossible to find this ride' }));
//         });
  });
    });

    router.post('/api/logout',ensureLoggedIn('/api/login'), (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});

router.get('/api/checklogin', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
    }

    res.status(401).json({ message: 'Unauthorized' });
});


module.exports = router;
