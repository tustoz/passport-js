const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-basic");

router.get("/register", async (req, res) => {
  res.render("register.ejs", { user: req.user });
});

router.get("/login", (req, res) => {
  res.render("login.ejs", { user: req.user });
});

router.get("/", (req, res) => {
  res.render("home.ejs", { name: req.user.name });
});

// USER LOGIN SYSTEM
router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.redirect("login");
  } catch (err) {
    res.redirect("register");
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const users = await User.findOne({ email: email });
  if (users == null) {
    res.redirect("login");
  }
  try {
    if (await bcrypt.compare(req.body.password, users.password)) {
      const accessToken = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 60 * 60 }
      );
      res.render("profile", { user: req.user });
      console.log(user);
    } else {
      res.redirect("login");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
