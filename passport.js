/**
** This file is using to authenticate our HTTP requests
** It does so by using the passportJS package
**/

// Packages imports
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./config/index');
const User = require('./models/user');

// Creating an instance of JwtStrategy to extract the auths parametres from the header and check it with our user database
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    const user = User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch(err) {
    done(err, false);
  }
}));

// This method is used to check if the user combo given is valid or not
// First it search for user by its email, then check the given password using the verifyPassword method that we created
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
      if (!user) {
        return done(null, false);
      }
      const isMatch = await user.verifyPassword(password)
      if (!isMatch) {
        return done(null, false);
      }
      done(null, user);
  } catch (error) {
    done(error, false);
  }

}));
