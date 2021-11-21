// import mongoose
const mongoose = require("mongoose");

// set up .env
require("dotenv").config();

// set up mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
