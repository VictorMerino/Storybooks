import express from 'express'
import passport from 'passport'

const router = express.Router()

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

router.post('/register', (req, res) => {
  console.log(req.body)
  const { first_name, last_name, password, password2, email } = req.body

  let errors = []

  if (!first_name || !last_name || !password || !password2 || !email) {
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
      first_name,
      last_name,
      password,
      password2,
      email,
      layout: 'login',
    })
  } else {
    res.send(req.body)
  }
})

router.post('/login', (req, res) => {
  console.log(req.body)
  res.send('hello login')
})

export default router
