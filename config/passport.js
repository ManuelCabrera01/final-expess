const passport = require('passport');
const User = require('../models/user-model.js');
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//SerializeUser: is saving only the ID in the session
passport.serializeUser((userFromDb, next) => {
    next(null, userFromDb._id);
});


// Retrieve the user's info from the DB with the ID we got from the bowl
passport.deserializeUser((idFromBowl, next) => {
User.findById(
    idFromBowl,
    (err, userFromDb) => {
        if (err) {
          next(err);
          return;
        }

        next(null, userFromDb);
    }
  );
});
// username & password login strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'username',    // sent through AJAX from Angular
    passwordField: 'password'  // sent through AJAX from Angular
  },
  (theUserName, thePassword, next) => {

      User.findOne(
        { username: theUserName },
        (err, userFromDb) => {
            if (err) {
              next(err);
              return;
            }

            if (userFromDb === null) {
              next(null, false, { message: 'Incorrect username 💩' });
              return;
            }

            if (bcrypt.compareSync(thePassword, userFromDb.password) === false) {
              next(null, false, { message: 'Incorrect password 💩' });
              return;
            }

            next(null, userFromDb);
        }
      ); // close User.findOne()

  } // close (theUserName, thePassword, next) => {
));
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
