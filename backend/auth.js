const ejwt = require("express-jwt");
const Volunteer = require("./models/volunteer");

const jwtSecret = process.env.JWT_SECRET || "secretkey";

const jwtOptions = {
  secret: jwtSecret,
  algorithms: ["sha1", "RS256", "HS256"],
  getToken: (req) => req.cookies.auth_token,
};

const getUser = async (req, res, next) => {
  const { user } = req;

  if (user) {
    const { id } = req.user;
    await Volunteer.findById(id, (err, user) => {
      req.user = user;
    });
  }
  next();
};

// middleware array to authenticate, then populate `req.user`
const auth = [ejwt(jwtOptions), getUser];

module.exports = { auth, jwtSecret };
