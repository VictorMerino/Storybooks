import express from 'express'
import passport from 'passport'
import bcrypt from 'bcryptjs'

const router = express.Router()

import User from '../models/User.js'
/* router.get(
  '/login',
  res.render('login', {
    layout: 'login',
  })
) */

router.get('/register', (req, res) => {
  res.render('register', {
    layout: 'login',
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  // Successful logout, redirect to homepage.
  res.redirect('/')
})

router.post('/register', async (req, res) => {
  console.log(req.body)
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
  if (errors.length) {
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
  } else {
    const user = await User.findOne({ email })
    if (user) {
      errors.push({ msg: 'Email is already registered' })
      res.render('register', {
        errors,
        firstName,
        lastName,
        password,
        password2,
        email,
        layout: 'login',
      })
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
          res.redirect('/')
        })
      )
      console.log(newUser)
      // Not yet, we need to actually save the user before: res.redirect('/dashboard')
    }
  }
})

router.post('/login', (req, res) => {
  console.log(req.body)
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
    // TO-DO: check for the actual user in mongo DB
    res.redirect('/dashboard')
  }
})

export default router
