const mongoose = require('mongoose')
const {volunteerDB, opportunityDB} = require('../connections')

const opportunitySchema = new mongoose.Schema({
   title: String,
   description: String,
   pictures: [String],
   start_event: [Date],
   end_event: [Date], 
   skills: [String],
   wishlist: [String],
   location: String,
   requirements: [String],
   additionalInfo: [String],
   tasks: [{roleName: String, description: String, start: [Date], end: [Date], additionalRequirements: [String]}],
   volunteers: {type: Map, of: {tasks: [String], start: [Date], end: [Date], donated: [String]}}
}, { collection: 'opportunityDB' })

const Opportunity = opportunityDB.model('opportunityDB', opportunitySchema)
module.exports = Opportunity
