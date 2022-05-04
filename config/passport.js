import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
/* import passport from 'passport-google-oauth20'
const { Strategy: GoogleStrategy } = passport */
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import User from '../models/User.js'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile) => {
      /* User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user)
      }) */
      console.log(profile)
      // Here more functions?
    }
  )
)

export default passport
