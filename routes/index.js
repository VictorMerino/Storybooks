import express from 'express'

import { ensureAuth, ensureGuest } from '../middleware/auth.js'

const router = express.Router()

router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard')
})

export default router
