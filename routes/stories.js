import express from 'express'

import { ensureAuth } from '../middleware/auth.js'
import Story from '../models/Story.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})

router.post('/', ensureAuth, async (req, res) => {
  try {
    // req.body.user = req.user.id
    await Story.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    res.render('error/500')
    throw new Error(err)
  }
  res.render('stories/add')
})

export default router
