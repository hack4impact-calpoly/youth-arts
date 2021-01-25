const mongoose = require("mongoose")
const Opportunity = require("./opportunity")

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
    AOI: [String],
    communityRole: String,
    experience: [String],
    workHistory: [String],
    outreach: String,
    signature: Boolean,
    opportunities: [ {type: [mongoose.Schema.Types.ObjectId], ref: 'Opportunity'} ]

}, {collection : "userDB"})


const Volunteer = mongoose.model("userDB", volunteerSchema)

module.exports = Volunteer