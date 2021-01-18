const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Opportunity = require('./models/opportunity.js')

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

app.listen(3001)
