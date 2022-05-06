import express from 'express'

import { ensureAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/dashboard', ensureAuth, (req, res) => {
  console.log(req.user)
  res.render('dashboard', {
    userEmail: req.user.email,
    randomVariable: 'rrrr',
  })
})

export default router
