const mongoose = require("mongoose")
const {volunteerDB, opportunityDB} = require('../connections')
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
    availability: String,
    notes: String,
    boardMember: Boolean,
    opportunities: {type: Map, of: {roleName: String, description: String, start: [Date], end: [Date], donated: [String]}}

}, {collection : "userDB"})

volunteerSchema.plugin(passportLocalMongoose)
volunteerSchema.plugin(findOrCreate)

const Volunteer  = volunteerDB.model('userDB', volunteerSchema)
module.exports = Volunteer