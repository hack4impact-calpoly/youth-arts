const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const findOrCreate = require("mongoose-findorcreate")

const app = express()
const Opportunity = require('./models/opportunity')
const Volunteer = require('./models/volunteer')

require('dotenv').config()

app.use(bodyParser.json())

app.use(session({
   secret : "Our little secret.",
   resave: false,
   saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(Volunteer.createStrategy())

passport.serializeUser((user, done) => {
   done(null, user.id)
})

passport.deserializeUser((id, done) => {
   Volunteer.findByID(id, (err, user) => {
      done(err, user)
   })
})

passport.use(new GoogleStrategy({
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: "http://localhost:4000/auth/google/callback",
   userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
   },
   (accessToken, refreshToken, profile, cb) => {
      Volunteer.findOrCreate({googleId: profile.id, username: profile.id},
         (err, user) => {
            return cb(err, user)
         })
   }

))

mongoose.connect(process.env.userDB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true
}).then(() => console.log("Connected to userDB"))

mongoose.set("useCreateIndex", true)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get("/auth/google",
   passport.authenticate("google", { scope: ["profile"] })
)

app.get("/auth/google/callback",
   passport.authenticate("google", { failureRedirect:
   "http://localhost:3000" }),
   (req, res) => {
      //Succesful authentication, redirect secrets.
      res.redirect("http://localhost:3000")
   }
)

app.get("/logout", (req, res) => {
   res.redirect("http://localhost:3000/")
})

const getAllOpportunities = async () => {
   return await Opportunity.find({})
}

const getVolunteerByName = async (first, last) => {
   return await Volunteer.findOne({firstName: first, lastName: last})
}

const getVolunteerPersonalInfo = async (opp_id) => {
   volunteer_info = []
   volunteer_ids = await Opportunity.findById(opp_id).volunteers.keys()
   for (id in volunteer_ids) {
      volunteer = await Volunteer.findById(id)
      info = []
      info.push(volunteer.firstName)
      info.push(volunteer.lastName)
      info.push(volunteer.phoneNumber)
      volunteer_info.push(info)
   }
   return volunteer_info
}

const getVolunteerInfo = async (opp_id) => {
   volunteer_info = []
   hours = 0
   volunteers = await Opportunity.findById(opp_id).volunteers
   for (id in volunteers.keys()) {
      volunteer = await Volunteer.findById(id)
      volunteer_opp_info = volunteers.get(id)
      info = []
      info.push(volunteer.firstName + " " + volunteer.lastName)
      info.push(volunteer.phoneNumber)
      for (i = 0; i < volunteer.start.length; i++) {
         if (volunteer.end[i].getTime() <= Date.now().getTime()) {
            hours += (volunteer.end[i].getTime() - volunteer.start[i].getTime)
         } 
      }
      info.push(hours)
      info.push(volunteer_opp_info.donated)
      info.push(volunteer.email)
      info.push(volunteer_opp_info.tasks)
      volunteer_info.push(info)
   }
   return volunteer_info
}

const volunteerSignUp = async (vol_id, opp_id, tasks) => {
   volunteer = await Volunteer.findById(vol_id)
   opportunity = await Opportunity.findById(opp_id)
   opportunity.volunteers.push({vol_id: {start: Date.now(), end: Date.now(), tasks: tasks, donated: []}})
   volunteer.opportunities.push({opp_id: {start: Date.now(), end: Date.now(), tasks: tasks, donated: []}})
   await Volunteer.findByIdAndUpdate(vol_id, {opportunities: volunteer.opportunities})
   await Opportunity.findByIdAndUpdate(opp_id, {volunteers: opportunity.volunteers})
}

const updateStartTime = async (vol_id, opp_id, start) => {
   volunteer = await Volunteer.findById(vol_id)
   opportunity = await Opportunity.findById(opp_id)
   vol = opportunity.volunteers.get(vol_id)
   opp = volunteer.opportunities.get(opp_id)
   vol.start = start
   opp.start = start
   opportunity.volunteers.set(vol_id, vol)
   volunteer.opportunities.set(opp_id, opp)
   await Volunteer.findByIdAndUpdate(vol_id, {opportunities: volunteer.opportunities})
   await Opportunity.findByIdAndUpdate(opp_id, {volunteers: opportunity.volunteers})
}

const updateEndTime = async (vol_id, opp_id, end) => {
   volunteer = await Volunteer.findById(vol_id)
   opportunity = await Opportunity.findById(opp_id)
   vol = opportunity.volunteers.get(vol_id)
   opp = volunteer.opportunities.get(opp_id)
   vol.end = end
   opp.end = end
   opportunity.volunteers.set(vol_id, vol)
   volunteer.opportunities.set(opp_id, opp)
   await Volunteer.findByIdAndUpdate(vol_id, {opportunities: volunteer.opportunities})
   await Opportunity.findByIdAndUpdate(opp_id, {volunteers: opportunity.volunteers})
}

const updateItemsDonated = async (vol_id, opp_id, items) => {
   volunteer = await Volunteer.findById(vol_id)
   opportunity = await Opportunity.findById(opp_id)
   vol = opportunity.volunteers.get(vol_id)
   opp = volunteer.opportunities.get(opp_id)
   vol.donated = items
   opp.donated = items
   opportunity.volunteers.set(vol_id, vol)
   volunteer.opportunities.set(opp_id, opp)
   await Volunteer.findByIdAndUpdate(vol_id, {opportunities: volunteer.opportunities})
   await Opportunity.findByIdAndUpdate(opp_id, {volunteers: opportunity.volunteers}) 
}

app.listen(3001)
