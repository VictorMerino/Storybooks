import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import User from '../models/User.js'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = User.findOne({ email })
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }

        // Match password
        bcrypt.compare(password, user.password, (err, success) => {
          if (success) {
            return done(null, user)
          } else {
            return done(null, false, { message: 'Incorrect password' })
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  )
)
