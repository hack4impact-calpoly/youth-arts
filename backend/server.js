const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cors = require('cors')
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const passport = require("passport")
const passportJwt = require('passport-jwt');
const { auth, JWT_secret } = require('./auth');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const findOrCreate = require("mongoose-findorcreate")
const nodemailer = require("nodemailer")
const dateFormat = require("dateformat")

const app = express()
const Opportunity = require('./models/opportunity')
const Volunteer = require('./models/volunteer')
const { replaceOne } = require('./models/volunteer')
const cookieSession = require('cookie-session');

let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
     user: `${process.env.EMAIL_USER}`,
     pass: `${process.env.EMAIL_PASSWORD}`
  },
   // name: 'youtharts-volunteer.h4i-cp.org',
   // host: "smtp.mailtrap.io",
   // port: 2525,
   // auth: {
   //    user: "333d5d35efddbb",
   //    pass: "619530fcb4f9a9"
   // },
   logger: true
})

app.use(bodyParser.json())
app.use((req, res, next) => {
   res.header("Referrer-Policy", "same-origin");
   res.header('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
   res.header('Access-Control-Allow-Methods', 'POST,PUT,GET,DELETE');
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept');
   next();
 });

app.use(express.json());
app.use(cookieParser());

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
   req.user ? next(): res.sendStatus(401);
 }

passport.use(Volunteer.createStrategy())

const accessProtectionMiddleware = (req, res, next) => {
   if (req.isAuthenticated()) {
      next();
   } else {
      res.status(403).json({
         message: 'must be logged in to continue',
      });
   }
};

passport.use(new GoogleStrategy({
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
   userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
   },
function(accessToken, refreshToken, profile, cb) {
   //check user table 
   Volunteer.findOne({
      googleId: profile.id 
   }, function(err, user) {
       //No user was found... so create a new user 
       if (!user) {
           user = new Volunteer({
            googleId: profile.id, 
            username: profile.id, 
            email: profile.emails[0].value, 
            firstName: null, 
            admin: false, 
            boardMember: false, 
            opportunities: {}
           });
           user.save(function(err) {
               if (err) console.log(err);
               return cb(err, user)
           });
       } 
       else {
           //found user. Return
           if (!user.firstName){
               return cb(err, user)
           }
           else {
               return cb(err, user)
           }
       }
   });
}
));

app.post('/auth/token', (req, res) => {
   const token = req.body.token;
   const options = {
     secure: true,
     httpOnly: true,
     sameSite: 'none',
   };
   res.cookie('auth_token', token, options);
   res.sendStatus(200);
 });
 
 app.post('/auth/logout', (req, res) => {
   const options = {
     secure: true,
     httpOnly: true,
     sameSite: 'none',
   };
 
   res.clearCookie('auth_token', options);
   res.sendStatus(200);
   // res.redirect(process.env.CLIENT_URL);
 });


app.get('/auth/account', auth, (req, res) => {
   const account = req.user 
   res.json(account || {});
 });

// Server endpoint that returns user info

   app.get('/api/volunteer/:id', async (req, res) => {
      var userid = mongoose.Types.ObjectId(req.params.id)
      try 
      {
          var user;
          if (typeof userid === undefined || userid.length === 0)
          {
            res.redirect(`${process.env.CLIENT_URL}`)
          }
          user = await Volunteer.findById(userid)
          res.status(200).json(user);
      }
      catch (error)
      {
         console.log(error);
          res.status(400).send(error);
      }
  })  

  app.get('/api/volunteers', async(req, res) => {
     try {
        var users = await Volunteer.find({});
        res.status(200).json(users);
     }
     catch (error) {
        console.log(errors);
        res.status(400).send(error);
     }
  })

  const getVolunteer = async (userid) => {
	return await Volunteer.findById(userid)
}

app.get('/user', accessProtectionMiddleware, (req, res) => {
   res.json({
      message: 'you have accessed the protected endpoint!',
      yourUserInfo: req.user,
   });
});


app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/api/opportunityDetail/:name', async (req, res) => {
      var name = mongoose.Types.ObjectId(req.params.name)
      try 
      {
          let opp = await Opportunity.findById(name)
          res.status(200).json(opp);
      }
      catch (error)
      {
         console.log(error);
         res.status(400).send(error);
      }
})

app.get('/api/opportunities', async (req, res) => {
   try 
   {
       let opp = await Opportunity.find({});
       res.status(200).json(opp);
   }
   catch (error)
   {
      console.log(error);
      res.status(400).send(error);
   }
})

app.get('/api/volunteers', async (req, res) => {
   try 
   {
       let opp = await Volunteer.find({});
       res.status(200).json(opp);
   }
   catch (error)
   {
      console.log(error);
      res.status(400).send(error);
   }
})


app.get("/auth/google",
   passport.authenticate("google", { scope: ["profile", "email"] })
)


//Protected Route.
app.get('/protected', checkUserLoggedIn, (req, res) => {
  res.send(`<h1>${req.user.displayName}'s Profile Page</h1>`)
});


 app.get('/profile',
  passport.authorize('google', { failureRedirect: `${process.env.CLIENT_URL}/registration` }),
  function(req, res) {
    var user = req.user;
    var account = req.account;
  }
);

app.get("/auth/google/callback",
   passport.authenticate("google", { 
      session: false,
      failureRedirect:
      `${process.env.CLIENT_URL}` }),
   (req, res) => {
      //Succesful authentication, redirect secrets.
      const token = jsonwebtoken.sign({id: req.user._id}, JWT_secret);
      res.redirect(`${process.env.CLIENT_URL}/auth/login/${token}`);

   }
)

 app.get('/current-user', passport.authenticate("google", { scope: [['https://www.googleapis.com/auth/plus.login']] }), 
function(req, res, newuser) {
   res.status(302).json(req.user);
 });

app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });


app.get('/login',
  passport.authenticate('google', { scope: ["profile", "email"] }));


const getAllOpportunities = async () => {
   return await Opportunity.find({})
}

app.post("/api/updateOpportunity", async(req, res) => {
   try 
   {
      
       if (typeof req.body._id === undefined || req.body._id === "")
       {
         const newOpportunity = await postNewOpportunity(req.body.title, 
                                                         req.body.description, 
                                                         req.body.pictures,
                                                         req.body.start_event,
                                                         req.body.end_event,
                                                         req.body.skills,
                                                         req.body.wishlist,
                                                         req.body.location,
                                                         req.body.requirements,
                                                         req.body.tasks,
                                                         req.body.additionalInfo,
                                                         req.body.volunteers) 
       }
       else 
       {
         console.log(req.body);
         console.log(req.body._id);
         const newOpportunity = await Opportunity.findByIdAndUpdate(mongoose.Types.ObjectId(req.body._id), req.body);
         res.json(newOpportunity);
       }
   }
   catch (error)
   {
      console.log(error);
       res.status(400).send(error);
   }
})

//Checking Postman
app.post("/api/opportunity", async(req, res) => {
   const title = req.body.title
   const desc = req.body.desccription
   const pic = req.body.pictures
   const date = req.body.date
   const skills = req.body.skills
   const wishlist = req.body.wishlist
   const newOpportunity = await postNewOpportunity(title, desc, pic, date, skills, wishlist)
   res.json(newOpportunity)
})

app.post("/api/postVolunteer", async(req, res) => {
   const newVolunteer = await Volunteer.findByIdAndUpdate(req.body._id, req.body)

   //Email to new volunteer + admin
   const volunteerMessage = {
      from: `${process.env.EMAIL_USER}`,
      to: req.body.email,
      subject: "Account signup successful",
      text: "Congratulations " + req.body.firstName + ",\n\nYou have successfully made an account with PRYAC!",
      html: "<img src = cid:pryacLogo /><br></br> <p>Congratulations " + req.body.firstName + ",<br></br>You have successfully made an account with Paso Robles Youth Arts Volunteering!",
      attachments: [{
         filename: "PRYAC_logo.png",
         path: "../frontend/src/Images/PRYAC_logo.png",
         cid: "pryacLogo"
      }]
   }

   const adminMessage = {
      from: `${process.env.EMAIL_USER}`,
      to: `${process.env.EMAIL_USER}`,
      subject: "New account signup",
      text: req.body.firstName + req.body.lastName + "has successfully made an account with PRYAC.",
      html: "<img src = cid:pryacLogo /><br></br><p>" + req.body.firstName + req.body.lastName + " has successfully made an account with Paso Robles Youth Arts Volunteering.</p>",
      attachments: [{
         filename: "PRYAC_logo.png",
         path: "../frontend/src/Images/PRYAC_logo.png",
         cid: "pryacLogo"
      }]
   }
   transport.sendMail(volunteerMessage, function(err, info) {
      if (err) {
         console.log(err)
      } else {
         console.log(info)
      }
   })
   transport.sendMail(adminMessage, function(err, info) {
      if (err) {
         console.log(err)
      } else {
         console.log(info)
      }
   })   
   res.json(newVolunteer)
})

app.post("/api/opportunityStartTime/", async (req, res) => { 

   const id = req.body.id;
   const volId = req.body.volId;
   const date = req.body.date;
   const taskIndex = req.body.taskIndex;
   const timeIndex = req.body.timeIndex;

   try {
      await postStartTime(id, date, volId, taskIndex, timeIndex);
      res.status(200);
   }
   catch (error)
   {
      console.log(error)
      res.status(401).send(error)
   }

})

app.post("/api/opportunityEndTime/", async (req, res) => { 

   const id = req.body.id;
   const volId = req.body.volId;
   const date = req.body.date;
   const taskIndex = req.body.taskIndex;
   const timeIndex = req.body.timeIndex;

   try {
      await postEndTime(id, date, volId, taskIndex, timeIndex);
      res.status(200);
   }
   catch (error)
   {
      console.log(error)
      res.status(401).send(error)
   }

})

const postStartTime = async (id, date, volId, taskIndex, timeIndex) => {
      let opportunity = await Opportunity.findById(id);
      opportunity.volunteers.get(volId)[taskIndex]["start"].splice(timeIndex, 1, date);
      await Opportunity.findByIdAndUpdate(id, {volunteers: opportunity.volunteers});

      // let volunteer = await Volunteer.findById(volId);
      // volunteer.opportunity.get(id)[taskIndex]["start"].splice(timeIndex, 1, date);
      // await Volunteer.findByIdAndUpdate(volId, {volunteers: opportunity.volunteers});
        
}

const postEndTime = async (id, date, volId, taskIndex, timeIndex) => {
   let opportunity = await Opportunity.findById(id);
   opportunity.volunteers.get(volId)[taskIndex]["end"].splice(timeIndex, 1, date);
   await Opportunity.findByIdAndUpdate(id, {volunteers: opportunity.volunteers});

   // let volunteer = await Volunteer.findById(volId);
   // volunteer.opportunity.get(id)[taskIndex]["end"].splice(timeIndex, 1, date);
   // await Volunteer.findByIdAndUpdate(volId, {volunteers: opportunity.volunteers});
   
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
   
   console.log(volunteer.email);
   
   
   //Emails to confirm signup
   const volunteerMessage = {
      from: `${process.env.EMAIL_USER}`,
      to: volunteer.email,
      subject: opportunity.title + " sign up successful",
      html: "<p>Hello " + volunteer.firstName + ",<br></br>You have successfully signed up for a volunteer session for " + opportunity.title + 
      " on " + dateFormat(opportunity.start_event, "fullDate") + " at " + dateFormat(opportunity.start_event, "h:MM TT Z") + 
      ".</p><p>The event will currently be held at " + opportunity.location + 
      ".</p><p>The business you chose to donate to or register with was blank.<br></br><br></br>Click here or call this number (805-238-5825) to cancel your registration.</p><img src = cid:pryacLogo />",
      attachments: [{
         filename: "PRYAC_logo.png",
         path: "..\\frontend\\src\\Images\\PRYAC_logo.png",
         cid: "pryacLogo"
      }]
   }
   const adminMessage = {
      from: `${process.env.EMAIL_USER}`,
      to: `${process.env.EMAIL_USER}`,
      subject: opportunity.title + " sign up successful - " + volunteer.firstName + " " + volunteer.lastName,
      html: "<p>" + volunteer.firstName + " " + volunteer.lastName + " has successfully signed up for a volunteer session for " + opportunity.title + 
      " on " + dateFormat(opportunity.start_event, "fullDate") + " at " + dateFormat(opportunity.start_event, "h:MM TT Z") + 
      ".</p><p>The business that they chose to donate to or register with was blank.</p><br></br><img src = cid:pryacLogo />",
      attachments: [{
         filename: "PRYAC_logo.png",
         path: "..\\frontend\\src\\Images\\PRYAC_logo.png",
         cid: "pryacLogo"
      }]
   }
   
   transport.sendMail(volunteerMessage, function(err, info) {
      if (err) {
         console.log(err)
      } else {
         console.log(info)
      }
   })
   
   
   transport.sendMail(adminMessage, function(err, info) {
      if (err) {
         console.log(err)
      } else {
         console.log(info)
      }
   })
   
}


const volunteerUnregister = async (vol_id, opp_id) => {
   
   volunteer = await Volunteer.findById(vol_id)
   opportunity = await Opportunity.findById(opp_id)
   for(i = 0; i < opportunity.volunteers.length; i++){
      if(opportunity.volunteers[i].vol_id == vol_id){
         opportunity.volunteers.splice(i, 1)
      }
   }
   for(i = 0; i < volunteer.opportunities.length; i++){
      if(volunteer.opportunities[i].opp_id == opp_id){
         volunteer.opportunities.splice(i, 1)
      }
   }
   await Volunteer.findByIdAndUpdate(vol_id, {opportunities: volunteer.opportunities})
   await Opportunity.findByIdAndUpdate(opp_id, {volunteers: opportunity.volunteers})
   
   //Emails to confirm signup
   const volunteerMessage = {
      from: `${process.env.EMAIL_USER}`,
      to: volunteer.email,
      subject: opportunity.title + " sign up successful",
      html: "<p>Hello " + volunteer.firstName + ",<br></br>You have successfully unregistered for your volunteer session for " + opportunity.title + 
      " on " + dateFormat(opportunity.start_event, "fullDate") + " at " + dateFormat(opportunity.start_event, "h:MM TT Z") + 
      ".</p><br></br><img src = cid:pryacLogo />",
      attachments: [{
         filename: "PRYAC_logo.png",
         path: "..\\frontend\\src\\Images\\PRYAC_logo.png",
         cid: "pryacLogo"
      }]
   }

   const adminMessage = {
      from: `${process.env.EMAIL_USER}`,
      to: `${process.env.EMAIL_USER}`,
      subject: opportunity.title + " unregistration successful - " + volunteer.firstName + " " + volunteer.lastName,
      html: "<p>" + volunteer.firstName + " " + volunteer.lastName + " has unregistered for a volunteer session for " + opportunity.title + 
      " on " + dateFormat(opportunity.start_event, "fullDate") + " at " + dateFormat(opportunity.start_event, "h:MM TT Z") + 
      ".</p><br></br><img src = cid:pryacLogo />",
      attachments: [{
         filename: "PRYAC_logo.png",
         path: "..\\frontend\\src\\Images\\PRYAC_logo.png",
         cid: "pryacLogo"
      }]
   }

   transport.sendMail(volunteerMessage, function(err, info) {
      if (err) {
         console.log(err)
      } else {
         console.log(info)
      }
   })
   transport.sendMail(adminMessage, function(err, info) {
      if (err) {
         console.log(err)
      } else {
         console.log(info)
      }
   })
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

const postNewOpportunity = async (title, description, pictures, start_event, end_event, skills, 
   wishlist, location, requirements, tasks, additionalInfo, volunteers) => {
   return new Opportunity({
      title, description, pictures, start_event, end_event, skills, 
      wishlist, location, requirements, tasks, additionalInfo, volunteers
   }).save()
}

const getAllOpportunitiesByDates = async (start, end) => {
   opportunities = await Opportunity.find({})
   within_range = []
   for (index = 0; index < opportunities.length; index++) {
      i = 0
      included = false
      while (i < opportunities[index].start_event.length && !included) {
         if (start <= opportunities[index].start_event[i] && end >= opportunities[index].end_event[i]) {
            opp_info = []
            opp_info.push(opportunities[index].title)
            opp_info.push(opportunities[index].start_event[i])
            opp_info.push(opportunities[index].end_event[i])
            opp_info.push(opportunities[index].skills)
            opp_tasks = []
            opp_tasks.push(...opportunities[index].tasks)
            opp_info.push(opportunities[index])
            count = 0
            donated = []
            for (volunteer in opportunities[index].volunteers.values()) {
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
   opportunities = await getAllOpportunitiesByDates(start, end)
   for (i = 0; i < opportunities.length; i++) {
      if (opportunities[i][3].includes(skill)) {
         including_skill.push(opportunities[i])
      }
   }
   return including_skill
}

if (process.argv.includes('dev')) {
   const PORT = process.env.PORT || 4000;
   app.listen(PORT, () => console.log(`server running on port ${PORT}`));
 }

 module.exports = app;
