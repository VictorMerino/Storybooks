import express from 'express'
import passport from 'passport'
import bcrypt from 'bcryptjs'

const router = express.Router()

import { ensureGuest } from '../middleware/auth.js'
import User from '../models/User.js'

router.get('/login', ensureGuest, (req, res) => {
  // TO-DO: try https://www.npmjs.com/package/named-routes
  res.render('login', {
    layout: 'login',
  })
})

router.get('/register', ensureGuest, (req, res) => {
  res.render('register', {
    layout: 'login',
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('successMsg', 'You are now logged out')
  // Successful logout, redirect to homepage.
  res.redirect('/')
})

router.post('/register', async (req, res) => {
  const { firstName, lastName, password, password2, email } = req.body

  let errors = []

  if (!firstName || !lastName || !password || !password2 || !email) {
    errors.push({ msg: 'All fields are required' })
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  const passwordLength = 6
  if (password.length < passwordLength) {
    errors.push({ msg: `Passwords minimum length is ${passwordLength}` })
  }

  function renderRegisterWithErrors() {
    console.log('Check for errors')
    res.render('register', {
      errors,
      firstName,
      lastName,
      password,
      password2,
      email,
      layout: 'login',
    })
  }
  if (errors.length) {
    renderRegisterWithErrors()
  } else {
    const user = await User.findOne({ email })
    if (user) {
      errors.push({ msg: 'Email is already registered' })
      renderRegisterWithErrors()
    } else {
      const newUser = new User({
        email,
        firstName,
        lastName,
        password,
      })

      // Hash password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, async (error, hash) => {
          if (error) throw new Error(err)

          // Set password hashed
          newUser.password = hash
          await newUser.save()
          req.flash('successMsg', 'You are now registered, now you can log-in')
          res.redirect('/')
        })
      )
    }
  }
})

router.post('/login', (req, res, next) => {
  const { email, password } = req.body

  let errors = []

  if (!email || !password) {
    errors.push({ msg: 'All fields are required' })
  }

  if (errors.length) {
    console.log('Check for errors')
    res.render('login', {
      errors,
      email,
      password,
      layout: 'login',
    })
  } else {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true,
    })(req, res, next)
  }
})

export default router
