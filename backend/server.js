const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

const app = express();

const volunteerEndpoints = require("./routes/volunteer");
const opportunityEndpoints = require("./routes/opportunity");
const donationEndpoints = require("./routes/donation");
const authEndpoints = require("./routes/auth");

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
app.use(authEndpoints);

// Middleware - Check user is Logged in
const checkUserLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const accessProtectionMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      message: "must be logged in to continue",
    });
  }
};

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

// Protected Route.
app.get("/protected", checkUserLoggedIn, (req, res) => {
  res.send(`<h1>${req.user.displayName}'s Profile Page</h1>`);
});

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

if (process.argv.includes("dev")) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
}

module.exports = { app, transport };
