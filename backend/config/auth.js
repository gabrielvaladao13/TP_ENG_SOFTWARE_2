const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../database/Models/User.js');
const bcrypt = require('bcrypt');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {email: email},
        });

        if (!user) {
          throw new Error('Email e/ou senha incorretos!');
        }
        const matchingPassword = password == user.password;
        if (!matchingPassword) {
          throw new Error('Email e/ou senha incorretos!');
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }

  return token;
};

passport.use(
  new JwtStrategy(
    {
      secretOrKey: 'mysecretkey',
      jwtFromRequest: cookieExtractor,
    },
    async (jwtPayload, done) =>{
      try {
        return done(null, jwtPayload.User);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);