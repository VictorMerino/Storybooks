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
        const user = await User.findOne({ email: email }).exec()
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }

        // Match password
        bcrypt.compare(password, user.password, (err, success) => {
          return success
            ? done(null, user)
            : done(null, false, { message: 'Incorrect password' })
        })
      } catch (err) {
        console.log(err)
      }
    }
  )
)

passport.serializeUser((user, cb) => {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username })
  })
})

passport.deserializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, user)
  })
})

export default passport
