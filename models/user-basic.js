// import mongoose module
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userBasicSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

// hash user password before saving into database
userBasicSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// export models
module.exports = mongoose.model("User", userBasicSchema);
