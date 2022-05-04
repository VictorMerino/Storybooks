import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/google/callback', (req, res) => {
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  })
  // Successful authentication, redirect to dashboard.
  res.redirect('/dashboard')
})

router.get('/logout', (req, res) => {
  req.logout()
  // Successful logout, redirect to homepage.
  res.redirect('/')
})

export default router
