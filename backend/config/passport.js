const passport=require('passport')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config()
passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5173//auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
   
  }
));