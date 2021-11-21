// set up .env
require("dotenv").config();

// import passport & google strategies
const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;

const FacebookUser = require("../models/facebook-user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  FacebookUser.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new facebookStrategy(
    {
      callbackURL: "/auth/social/facebook/redirect",
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      //passport cb, lookup user on database
      console.log(profile);
      FacebookUser.findOne({ facebookId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("User found: " + currentUser);
          done(null, currentUser);
          // if user have not exist, create user on database
        } else {
          new FacebookUser({
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
