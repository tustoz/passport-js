// import mongoose module
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new mongoose models
const githubUserSchema = new Schema({
  githubId: String,
  username: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: String,
  bio: String,
  public_repos: String,
  public_gists: String,
  following: String,
  followers: String,
  thumbnail: String,
  created_at: String,
  updated_at: String,
});

// export models
module.exports = mongoose.model("githubUser", githubUserSchema);
