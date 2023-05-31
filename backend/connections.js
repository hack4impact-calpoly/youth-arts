const mongoose = require("mongoose");

require("dotenv").config();

const volunteerDB = mongoose.createConnection(process.env.userDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.set("useCreateIndex", true);

console.log("Connected to volunteerDB");

const opportunityDB = mongoose.createConnection(process.env.opportunityDB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

console.log("Connected to opportunityDB");

module.exports = { volunteerDB, opportunityDB };
