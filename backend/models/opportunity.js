const mongoose = require('mongoose')
const Volunteer = require('./volunteer')

const opportunitySchema = new mongoose.Schema({
   title: String,
   description: String,
   pictures: [String],
   date: [Date],
   time: Number, 
   skills: [String],
   wishlist: [String],
   volunteers: [{type: Map, of: {start: [Date], end: [Date], tasks: [String], donated: [String]}}]
}, { collection: 'opportunityDB' })

const Opportunity = mongoose.model('opportunityDB', opportunitySchema)
module.exports = Opportunity
