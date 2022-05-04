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
  console.log(res)
  res.send('hello')
})

export default router
