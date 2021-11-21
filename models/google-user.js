// import mongoose module
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new mongoose models
const googleUserSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
});

// export models
module.exports = mongoose.model("googleUser", googleUserSchema);
