// set up .env
require("dotenv").config();

// import passport & google strategies
const passport = require("passport");
const githubStrategy = require("passport-github2").Strategy;

const User = require("../models/github-user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new githubStrategy(
    {
      callbackURL: "/auth/social/github/redirect",
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    function (accessToken, refreshToken, profile, done) {
      //passport cb, lookup user on database
      User.findOne({ githubId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("User found: " + currentUser);
          done(null, currentUser);
          // if user have not exist, create user on database
        } else {
          new User({
            githubId: profile.id,
            username: profile.displayName,
            company: profile.company,
            blog: profile.blog,
            location: profile.location,
            email: profile.email,
            hireable: profile.hireable,
            bio: profile.bio,
            public_repos: profile.public_repos,
            public_gists: profile.public_gists,
            following: profile.following,
            followers: profile.followers,
            thumbnail: profile.avatar_url,
            created_at: profile.created_at,
            updated_at: profile.updated_at,
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
