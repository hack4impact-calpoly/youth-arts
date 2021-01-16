const mongoose = require('mongoose')

const opportunitySchema = new mongoose.Schema({
   title: String,
   description: String,
   pictures: [String],
   date: Date,
   time: Number, 
   skills: [String],
   wishlist: [String],
   volunteers: [Volunteer]
}, { collection: 'opportunityDB' })

const Opportunity = mongoose.model('opportunityDB', opportunitySchema)
module.exports = Opportunity
