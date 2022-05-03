import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

router.get('/dashboard', (req, res) => {
  res.render('dashboard')
})

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
)

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  }
)

export default router
