// import mongoose module
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new mongoose models
const facebookUserSchema = new Schema({
  username: String,
  facebookId: String,
  thumbnail: String,
});

// export models
module.exports = mongoose.model("facebookUser", facebookUserSchema);
