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
  res.send('hello register')
})

router.post('/login', (req, res) => {
  console.log(req.body)
  res.send('hello login')
})

export default router
