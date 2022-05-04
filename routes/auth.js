import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', (req, res) => {
  passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  })
  // Successful authentication, redirect to dashboard.
  res.redirect('/dashboard')
})

export default router
