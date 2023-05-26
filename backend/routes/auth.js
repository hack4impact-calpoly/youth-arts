const express = require("express");
const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Volunteer = require("../models/volunteer");

const router = express.Router();
router.use(express.json());

const { auth, jwtSecret } = require("../auth");

passport.use(Volunteer.createStrategy());

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
        (err, foundUser) => {
          // No user was found... so create a new user
          if (!foundUser) {
            const user = new Volunteer({
              googleId: profile.id,
              username: profile.id,
              email: profile.emails[0].value,
              firstName: null,
              admin: false,
              boardMember: false,
              opportunities: {},
            });
            user.save((saveErr) => {
              if (saveErr) console.log(err);
              return cb(saveErr, user);
            });
          } else {
            // found user. Return
            if (!foundUser.firstName) {
              return cb(null, foundUser);
            }
            return cb(null, foundUser);
          }
          return null;
        }
      );
    }
  )
);

// app.get(
//   "/profile",
//   passport.authorize("google", {
//     failureRedirect: `${process.env.CLIENT_URL}/registration`,
//   }),
//   (req, res) => {
//     const { user } = req;
//     const { account } = req;
//   }
// );

// app.get(
//   "/current-user",
//   passport.authenticate("google", {
//     scope: [["https://www.googleapis.com/auth/plus.login"]],
//   }),
//   (req, res, newuser) => {
//     res.status(302).json(req.user);
//   }
// );

router.get(
  "/api/auth/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.post("/api/auth/token", (req, res) => {
  const { token } = req.body;
  const options = {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  };
  res.cookie("auth_token", token, options);
  res.sendStatus(200);
});

router.post("/auth/logout", (req, res) => {
  const options = {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  };

  res.clearCookie("auth_token", options);
  res.sendStatus(200);
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}`,
  }),
  (req, res) => {
    // Succesful authentication, redirect secrets.
    const token = jsonwebtoken.sign({ id: req.user._id }, jwtSecret);
    res.redirect(`${process.env.CLIENT_URL}/api/auth/login/${token}`);
  }
);

router.get("/auth/account", auth, (req, res) => {
  const account = req.user;
  res.json(account || {});
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

module.exports = router;
