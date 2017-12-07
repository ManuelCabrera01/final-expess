const express = require ('express');
const bcrypt  = require ('bcrypt');
const User = require ('../models/user-model');
const upload = require('../config/multer');
const router = express.Router();

 router.post('/signup', upload.single('file'), (req, res, next)=>{
   const username= req.body.username; //username from the user model schema = username from the form
   const password = req.body.password;
   const category = req.body.category;
   const rides = req.body.rides;
   const image =  `/upload/${req.file.filename}`;

   if (!username || !password){
     res.status(400).json({message:"provide username and password"});
     return;
   }

   User.findOne({username:username}, '_id', (err,foundUser)=>{
 if(foundUser){
  res.status(400).json({message: 'the user name already exits'});
  return;
}
//save to the DB if we didn't find the user
   const salt = bcrypt.genSaltSync(10);
   const hashPass= bcrypt.hashSync(password, salt);
   const theUser = new User({
     username: username,
     password: hashPass,
     category: category,
     rides:    rides,
     image:    image
 });

 theUser.save((err) => {
   if (err) {
     res.status(500).json({ message: 'somthing went wrong'});
   }

   req.login(foundUser,(error)=> {
     theUser.password= undefined;
     res.status(200).json(theUser);
   });
     });//theUset.save()
   });//USser.find
 });//GET/signup

  module.exports = router;

  router.post('/login', (req, res, next )=> {
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
  });
    });

    router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.User);
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

router.get('/private', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ message: 'This is a private message' });
    return;
  }

  res.status(403).json({ message: 'Unauthorized ' });
});
