const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jsonwebtoken = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const nodemailer = require("nodemailer");
const moment = require("moment");

const app = express();
const cookieSession = require("cookie-session");
const Opportunity = require("./models/opportunity");
const Volunteer = require("./models/volunteer");
const { auth, jwtSecret } = require("./auth");

const volunteerEndpoints = require("./routes/volunteer");
const opportunityEndpoints = require("./routes/opportunity");
const donationEndpoints = require("./routes/donation");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL_USER}`,
    pass: `${process.env.EMAIL_PASSWORD}`,
  },
  logger: true,
});

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Referrer-Policy", "same-origin");
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header("Access-Control-Allow-Methods", "POST,PUT,GET,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use(volunteerEndpoints);
app.use(opportunityEndpoints);
app.use(donationEndpoints);

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

passport.use(Volunteer.createStrategy());

const accessProtectionMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      message: "must be logged in to continue",
    });
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    (accessToken, refreshToken, profile, cb) => {
      // check user table
      Volunteer.findOne(
        {
          googleId: profile.id,
        },
        (err, user) => {
          // No user was found... so create a new user
          if (!user) {
            user = new Volunteer({
              googleId: profile.id,
              username: profile.id,
              email: profile.emails[0].value,
              firstName: null,
              admin: false,
              boardMember: false,
              opportunities: {},
            });
            user.save((err) => {
              if (err) console.log(err);
              return cb(err, user);
            });
          } else {
            // found user. Return
            if (!user.firstName) {
              return cb(err, user);
            }
            return cb(err, user);
          }
        }
      );
    }
  )
);

app.post("/auth/token", (req, res) => {
  const { token } = req.body;
  const options = {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  };
  res.cookie("auth_token", token, options);
  res.sendStatus(200);
});

app.post("/auth/logout", (req, res) => {
  const options = {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  };

  res.clearCookie("auth_token", options);
  res.sendStatus(200);
});

app.get("/auth/account", auth, (req, res) => {
  const account = req.user;
  res.json(account || {});
});

// Server endpoint that returns user info

app.get("/user", accessProtectionMiddleware, (req, res) => {
  res.json({
    message: "you have accessed the protected endpoint!",
    yourUserInfo: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Protected Route.
app.get("/protected", checkUserLoggedIn, (req, res) => {
  res.send(`<h1>${req.user.displayName}'s Profile Page</h1>`);
});

app.get(
  "/profile",
  passport.authorize("google", {
    failureRedirect: `${process.env.CLIENT_URL}/registration`,
  }),
  (req, res) => {
    const { user } = req;
    const { account } = req;
  }
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}`,
  }),
  (req, res) => {
    // Succesful authentication, redirect secrets.
    const token = jsonwebtoken.sign({ id: req.user._id }, jwtSecret);
    res.redirect(`${process.env.CLIENT_URL}/auth/login/${token}`);
  }
);

app.get(
  "/current-user",
  passport.authenticate("google", {
    scope: [["https://www.googleapis.com/auth/plus.login"]],
  }),
  (req, res, newuser) => {
    res.status(302).json(req.user);
  }
);

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

if (process.argv.includes("dev")) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

module.exports = { app, transport };
