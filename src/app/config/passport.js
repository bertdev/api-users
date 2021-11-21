require('dotenv').config();
const passport = require('passport');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');
const UsersRepository = require('../repositories/UsersRepository');

const notAturhorizedJson = {
  status: 401,
  message: 'Não aturorizado!',
};
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(new JWTStrategy(options, (payload, done) => {
  const user = UsersRepository.findByEmail(payload.email);
  if (user) {
    return done(null, user);
  }
  done(notAturhorizedJson, false);
}));

const privateRoute = (req, res, next) => {
  const authFunction = passport.authenticate('jwt', (err, user) => {
    req.user = user;
    return user ? next() : next(notAturhorizedJson);
  });
  authFunction(req, res, next);
};

const generateToken = (data) => jwt.sign(data, process.env.JWT_SECRET);

module.exports = { passport, privateRoute, generateToken };
