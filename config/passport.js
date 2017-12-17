const passport = require('passport');
const User = require('../models/user-model.js');
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;


//SerializeUser: is saving only the ID in the session
  passport.serializeUser((loginUser, cb) => {
    cb(null, loginUser._id);
  });


//retrieve full user details from DB using id, where all info is stored during session
  passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        cb(err);
        return
      }
      cb(null, userDocument);
    });
  });

  //facebook login logig
  passport.use(new FbStrategy({
  clientID: "1791113691185757",
  clientSecret: "a06999bcee58791c978ba895eab78804",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));

//google+ login logig
passport.use(new GoogleStrategy({
  clientID: "933646329562-m54j24fbiv9pnu95da55d43ser0e6or0.apps.googleusercontent.com",
  clientSecret: "VDsUN4Z6VuqhRWgrXaNMV94n",
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      googleID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));
