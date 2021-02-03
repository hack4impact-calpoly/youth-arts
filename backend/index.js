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
