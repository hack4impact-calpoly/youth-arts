const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Opportunity = require('./models/opportunity')
const Volunteer = require('./models/volunteer')

require('dotenv').config()

app.use(bodyParser.json())

mongoose.connect(process.env.userDB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true
}).then(() => console.log("Connected to userDB"))

app.get('/', (req, res) => {
  res.send('Hello world!')
})

const getAllOpportunities = async () => {
   return await Opportunity.find({})
}

const getVolunteerByName = async (first, last) => {
   return await Volunteer.findOne({firstName: first, lastName: last})
}

const updateUserRegistered = async (email, title) => {
   const volunteer = await Volunteer.findOne({email: email})
   const opportunity = await Opportunity.findOne({title: title})
   volunteer.opportunities.push(opportunity)
   opportunity.volunteers.push(volunteer)
   await Volunteer.updateOne({email: email}, 
      {opportunities: volunteer.opportunities})
   await Opportunity.updateOne({title: title}, 
      {volunteers: opportunity.volunteers})
}

app.listen(3001)
