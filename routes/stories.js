import express from 'express'

import { ensureAuth } from '../middleware/auth.js'
import Story from '../models/Story.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})

export default router
