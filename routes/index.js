import express from 'express'

import { ensureAuth } from '../middleware/auth.js'
import Story from '../models/Story.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/', (req, res) => {
  res.render('home', {
    isAuthenticated: req.isAuthenticated(),
  })
})

router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
    const stories = await Story.find({ user: user._id }).lean().exec()
    // TO-DO: set user in session variable, this way we will save a heavy and not actuallu needed call to db
    res.render('dashboard', {
      userName: `${user.firstName} ${user.lastName}`,
      stories,
      isAuthenticated: req.isAuthenticated(), // This is actually redundant, but dunno how to get it better
    })
  } catch (err) {
    console.log(err)
    res.render('error/500')
    throw new Error(err)
  }
})

export default router
