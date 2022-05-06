import express from 'express'

import { ensureAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('home', {
    isAuthenticated: req.isAuthenticated(),
  })
})

router.get('/dashboard', ensureAuth, (req, res) => {
  console.log(req.user)
  res.render('dashboard', {
    userEmail: req.user.email,
    randomVariable: 'rrrr',
    isAuthenticated: req.isAuthenticated(),
  })
})

export default router
