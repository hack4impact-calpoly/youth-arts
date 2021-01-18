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
        unique: true,
        match: [/\S+@\S+.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true
    }
}, { collection: 'adminDB' })

const Admin = mongoose.model('adminDB', adminSchema)
module.exports = Admin
