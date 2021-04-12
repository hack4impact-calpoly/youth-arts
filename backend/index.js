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
const { replaceOne } = require('./models/volunteer')

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
   Volunteer.findById(id, (err, user) => {
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
      Volunteer.findOrCreate({googleId: profile.id, username: profile.id, email: profile.emails[0].value},
         (err, user) => {
            return cb(err, user)
         })
   }

))

mongoose.set("useCreateIndex", true)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get("/auth/google",
   passport.authenticate("google", { scope: ["profile", "email"] })
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

//Checking Postman
app.post("/api/opportunity", async(req, res) => {
   const title = req.body.title
   const desc = req.body.desc
   const pic = req.body.pic
   const date = req.body.date
   const skills = req.body.skills
   const wishlist = req.body.wishlist
   const newOpportunity = await postNewOpportunity(title, desc, pic, date, skills, wishlist)
   res.json(newOpportunity)
})

const getOpportunityById = async (opp_id) => {
   return await Opportunity.findById(id)
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
      for (i = 0; i < volunteer_opp_info.start.length; i++) {
         if (volunteer_opp_info.end[i].getTime() <= Date.now().getTime()) {
            hours += (volunteer_opp_info.end[i].getTime() - volunteer_opp_info.start[i].getTime())
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

const volunteerSignUp = async (vol_id, opp_id, tasks, startTime, endTime) => {
   volunteer = await Volunteer.findById(vol_id)
   opportunity = await Opportunity.findById(opp_id)
   opportunity.volunteers.push({vol_id: {start: startTime, end: endTime, tasks: tasks, donated: []}})
   volunteer.opportunities.push({opp_id: {start: startTime, end: endTime, tasks: tasks, donated: []}})
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

const postNewOpportunity = async (title, desc, pictures, date, skills, wishlist) => {
   return new Opportunity({
      title,
      desc,
      pictures,
      date,
      skills,
      wishlist,
   }).save()
}

<<<<<<< HEAD
const getAllOpportunitiesByDates = async (start, end) => {
   opportunities = await Opportunity.find({})
   within_range = []
   for (opp in opportunities) {
      i = 0
      included = false
      while (i < opp.start_event.length && !included) {
         if (start <= opp.start_event[i] && end >= opp.end_event[i]) {
            opp_info = []
            opp_info.push(opp.title)
            opp_info.push(opp.start_event[i])
            opp_info.push(opp.end_event[i])
            opp_info.push(opp.skills)
            opp_tasks = []
            opp_tasks.push(...opp.tasks)
            opp_info.push(opp_tasks)
            count = 0
            donated = []
            for (volunteer in opp.volunteers.values()) {
               count += 1
               donated.push(...volunteer.donated)
            }
            opp_info.push(count)
            opp_info.push(donated)
            within_range.push(opp_info)
            included = true
         }
         i++;
      }
   }
   return within_range
}

const getAllOpportunitiesWithSkill = async (start, end, skill) => {
   including_skill = []
   for (i in getAllOpportunitiesByDates(start, end)) {
      if (i[3].includes(skill)) {
         including_skill.push(i)
      }
   }
   return including_skill
}

console.log(Opportunity.find({title: "Barn Bash & Dance Benefit"}).title)
app.listen(4000)
=======
app.listen(4000)
>>>>>>> 01b900729318eb8a290b15102a2e4599342718b0