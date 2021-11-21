const router = require("express").Router();
const passport = require("passport");

// auth login
// localhost:3000/auth/social/login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
// localhost:3000/auth/social/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// auth with google
// localhost:3000/auth/social/google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
// localhost:3000/auth/social/google/redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  res.render("profile", { user: req.user });
});

// auth with Facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
// localhost:3000/auth/social/facebook/redirect
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.render("profile", { user: req.user });
  }
);

// auth with Github
// localhost:3000/auth/social/github
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile"],
  })
);

router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
