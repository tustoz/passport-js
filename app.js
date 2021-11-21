require("dotenv").config();

// import express & passport
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const app = express();

// use passport oauth & mongoose database
const googlePassport = require("./services/passport-google");
const facebookPassport = require("./services/passport-facebook");
const githubPassport = require("./services/passport-github");
const linkedinPassport = require("./services/passport-linkedin");

const mongooseSetup = require("./services/mongoose-setup");

// use cookie-session
const cookieSession = require("cookie-session");

// import routes
const socialRoutes = require("./routes/social-routes");
const basicRoutes = require("./routes/basic-routes");
const profileRoutes = require("./routes/profile-routes");

// set up cookie key & time
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// set up auth routes
app.use("/auth/social", socialRoutes);
app.use("/auth", basicRoutes);

app.use("/profile", profileRoutes);

// middlewares auth check
const authCheck = (req, res, next) => {
  // user not logged in
  if (req.user) {
    res.redirect("/profile");
  } else {
    next();
  }
};

// http://localhost:3000 will render home.ejs
app.get("/", authCheck, (req, res) => {
  res.render("home", { user: req.user });
});

// set up port
app.listen(process.env.PORT || 3000, () => {
  console.log("Running on port " + process.env.PORT);
});
