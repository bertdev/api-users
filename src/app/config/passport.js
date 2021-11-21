require('dotenv').config();
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const notAturhorizedJson = {
  status: 401,
  message: 'Não aturorizado!',
};
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new Strategy(options, async (payload, done) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    return done(null, user);
  }
  done(notAturhorizedJson, false);
}));

const privateRoute = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    req.user = user;
    return user ? next() : next(notAturhorizedJson);
  })(req, res, next);
};

const generateToken = (data) => jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '2h' });

module.exports = { passport, privateRoute, generateToken };
