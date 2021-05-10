const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require("express-session")
var cors = require('cors')
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const findOrCreate = require("mongoose-findorcreate")

const app = express()
const Opportunity = require('./models/opportunity')
const Volunteer = require('./models/volunteer')
const { replaceOne } = require('./models/volunteer')
const cookieSession = require('cookie-session');


app.use(bodyParser.json())
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', `${process.env.CLIENT_URL}`);
   res.header('Access-Control-Allow-Methods', 'POST,PUT,GET,DELETE');
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept');
   next();
 });

app.use(cookieSession({
   name: 'session-name',
   keys: ['key1', 'key2']
 }))

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
   req.user ? next(): res.sendStatus(401);
 }

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
               return cb(err, user, true)
           });
       } 
       else {
           //found user. Return
           if (!user.firstName){
               return cb(err, user, true)
           }
           else {
               return cb(err, user, false)
           }
           
       }
   });
}
));

app.get('/auth/account', (req, res) => {
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
   passport.authenticate("google", { failureRedirect:
      `${process.env.CLIENT_URL}` }),
   (req, res, newUser) => {
      //Succesful authentication, redirect secrets.
      if (req.user.firstName !== null) {
         req.logIn(req.user, (err) => {
            if (err) {
              return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(`${process.env.CLIENT_URL}/authDashboard/` + req.user.id)
          });  
      
      }
      else {
         req.logIn(req.user, (err) => {
            if (err) {
              return next(err);
            }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(`${process.env.CLIENT_URL}/registration/` + req.user.id)
          });
    
      }

   }
)

 app.get('/current-user', passport.authenticate("google", { scope: [['https://www.googleapis.com/auth/plus.login']] }), 
function(req, res, newuser) {
   res.status(302).json(req.user);
 });

 app.get('/auth/logout', (req, res) => {
   req.logout();
   res.redirect(process.env.CLIENT_URL);
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
   res.json(newVolunteer)
})


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

const postNewOpportunity = async (title, description, pictures, start_event, end_event, skills, 
   wishlist, location, requirements, tasks, additionalInfo, volunteers) => {
   return new Opportunity({
      title, description, pictures, start_event, end_event, skills, 
      wishlist, location, requirements, tasks, additionalInfo, volunteers
   }).save()
}
const postNewVolunteer = async (first, last, email, phone, address, role, AOI, experience, employment, hearAboutUs, boardMember, digitalWaiver) => {
   return new Volunteer({
      id,
      first, 
      last, 
      email, 
      phone, 
      address, 
      role, 
      AOI, 
      experience, 
      employment, 
      hearAboutUs, 
      boardMember,
      digitalWaiver
   }).update()
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

app.listen(4000)
