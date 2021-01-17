const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: [/\S+@\S+.\S+/, 'is invalid']
    }
}, { collection: 'adminDB' })

const Admin = mongoose.model('adminDB', adminSchema)
module.exports = Admin
