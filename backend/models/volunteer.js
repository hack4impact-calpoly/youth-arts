const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const { volunteerDB, opportunityDB } = require("../connections");

const volunteerSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      match: [/\S+@\S+.\S+/, "is invalid"],
    },
    phoneNum: String,
    address: String,
    picture: String,
    googleId: String,
    secret: String,
    AOI: [String],
    communityRole: [String],
    experience: String,
    workHistory: String,
    outreach: String,
    signature: Boolean,
    tasks: [String],
    availability: String,
    notes: String,
    boardMember: Boolean,
    admin: Boolean,
    opportunities: {
      type: Map,
      of: [
        {
          task: String,
          description: String,
          start: [Date],
          end: [Date],
          donated: [String],
        },
      ],
    },
  },
  { collection: "userDB" }
);

volunteerSchema.plugin(passportLocalMongoose);
volunteerSchema.plugin(findOrCreate);

const Volunteer = volunteerDB.model("volunteerDB", volunteerSchema);
module.exports = Volunteer;
