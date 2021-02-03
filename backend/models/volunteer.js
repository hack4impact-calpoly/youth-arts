const mongoose = require("mongoose")
const Opportunity = require("./opportunity")
const passportLocalMongoose = require("passport-local-mongoose")
const findOrCreate = require("mongoose-findorcreate")

const volunteerSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNum: String,
    address: String,
    picture: String,
    googleId: String,
    secret: String,
    AOI: [String],
    communityRole: String,
    experience: [String],
    workHistory: [String],
    outreach: String,
    signature: Boolean,
    tasks: [String],
    opportunities: [{type: Map, of: {start: Date, end: Date, tasks: [String], donated: [String]}}]

}, {collection : "userDB"})

volunteerSchema.plugin(passportLocalMongoose)
volunteerSchema.plugin(findOrCreate)

const Volunteer = mongoose.model("userDB", volunteerSchema)

module.exports = Volunteer