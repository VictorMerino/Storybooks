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
    console.log(req.body)
    const { title, status, body } = req.body

    let errors = []
    if (!title || !status || !body) {
      errors.push({ msg: 'All fields are required' })
    }

    if (errors.length) {
      console.log('Check for errors', errors)
      res.render('stories/add', {
        title,
        status,
        body,
        errors,
      })
    } else {
      const newStory = {
        user: req.user.id,
        title,
        status,
        body,
      }
      await Story.create(newStory)
      res.redirect('/dashboard')
    }
  } catch (err) {
    res.render('error/500')
    throw new Error(err)
  }
})

export default router
