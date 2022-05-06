import express from 'express'

import { ensureAuth } from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('home', {
    isAuthenticated: req.isAuthenticated(),
  })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
  const user = await User.findOne({ id: req.user.id })
  // TO-DO: set user in session variable, this way we will save a heavy and not actuallu needed call to db
  res.render('dashboard', {
    userName: `${user.firstName} ${user.lastName}`,
    isAuthenticated: req.isAuthenticated(), // This is actually redundant, but dunno how to get it better
  })
})

export default router
