// set up .env
require("dotenv").config();

// import passport & google strategies
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;

const GoogleUser = require("../models/google-user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  GoogleUser.findById(id).then((user) => {
    done(null, user);
  });
});

// set up passport config
passport.use(
  new googleStrategy(
    {
      callbackURL: "/auth/social/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      //passport cb, lookup user on database
      console.log(profile);
      GoogleUser.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("User found: " + currentUser);
          done(null, currentUser);
          // if user have not exist, create user on database
        } else {
          new GoogleUser({
            googleId: profile.id,
            username: profile.displayName,
            thumbnail: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("User added: ", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
