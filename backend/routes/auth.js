const express = require("express");
const passport = require("passport");
const jsonwebtoken = require("jsonwebtoken");

const app = express();
const { auth, jwtSecret } = require("../auth");

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

app.get("/auth/account", auth, (req, res) => {
  const account = req.user;
  res.json(account || {});
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

module.exports = app;
