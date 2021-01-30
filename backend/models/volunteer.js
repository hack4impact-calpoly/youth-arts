const mongoose = require("mongoose")

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
    events: [Events]

}, {collection : "userDB"})

volunteerSchema.plugin(passportLocalMongoose)
volunteerSchema.plugin(findOrCreate)

const Volunteer = mongoose.model("userDB", volunteerSchema)

module.exports = Volunteer