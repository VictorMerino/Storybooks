import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
/* import passport from 'passport-google-oauth20'
const { Strategy: GoogleStrategy } = passport */
import dotenv from 'dotenv'
dotenv.config()

// import mongoose from 'mongoose'
import User from '../models/User.js'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user)
      }) */
      console.log('Google ID ', profile.id)
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
      }
      try {
        let user = await User.findOne({ googleId: profile.id })
        console.log('user')
        console.log(user)
        console.log('........')
        if (!user) user = await User.create(newUser)
        return cb(null, user)
      } catch (error) {
        console.log('Catch: ', error)
      }
      // Here more functions?
    }
  )
)

passport.serializeUser((user, cb) => {
  process.nextTick(function () {
    cb(null, { id: user.id })
  })
})

passport.deserializeUser((id, cb) => {
  /* process.nextTick(function () {
    return cb(null, user)
  }) */
  User.findById((id, (err, user) => cb(err, user)))
})

export default passport
