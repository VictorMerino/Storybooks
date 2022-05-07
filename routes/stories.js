import express from 'express'

import { ensureAuth } from '../middleware/auth.js'
import { canEdit } from '../helpers/hbs.js'

import Story from '../models/Story.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})

router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean()
    console.log(story)
    if (!story) return res.render('error/404')
    if (canEdit(story.user, req.user.id)) {
      console.log(story)
      res.render('stories/edit', { story })
    } else {
      console.log('Peta en el else')
      req.flash('errorMsg', 'You cannot edit this story')
      res.redirect('/')
    }
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
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
