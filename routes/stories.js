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
    // TO-DO: check for possible code-smell: I'm copying the next conditional:
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

router.put('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const { title, status, body } = req.body

    let story = await Story.findById(req.params.id).lean()
    if (!story) {
      return res.render('error/404')
    }

    let errors = []
    console.log('Title ', title)
    if (!title || !status || !body) {
      errors.push({ msg: 'All fields are required' })
    }

    if (errors.length) {
      console.log('Check for errors', errors)
      return res.render('stories/edit', { story, errors })
    }

    if (canEdit(story.user, req.user.id)) {
      story = await Story.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      }).lean()
      res.redirect('/dashboard')
    } else {
      console.log(
        'Something strange. User is trying to modify a story from other user'
      )
      req.flash('errorMsg', 'You cannot edit this story')
      res.render('error/500')
    }

    return false
  } catch (err) {
    res.render('error/500')
    throw new Error(err)
  }
})

router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id })
    req.flash('successMsg', "This story now sleeps in the story's paradise")
    res.redirect('/dashboard')
  } catch (err) {
    res.render('error/500')
    throw new Error(err)
  }
})

export default router
