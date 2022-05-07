import express from 'express'

import { ensureAuth } from '../middleware/auth.js'
import { canEdit } from '../helpers/hbs.js'

import Story from '../models/Story.js'
// import User from '../models/User.js'

const router = express.Router()

router.get('/add', ensureAuth, (req, res) => {
  return res.render('stories/add')
})

router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('user').lean()
    if (!story) {
      return res.render('error/404')
    }
    res.render('stories/single-story', { story, userId: req.user.id })
  } catch (error) {
    return res.render('error/404')
  }
})

router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean()
    if (!story) return res.render('error/404')
    // TO-DO: check for possible code-smell: I'm copying the next conditional:
    if (canEdit(story.user, req.user.id)) {
      return res.render('stories/edit', { story })
    }

    req.flash('errorMsg', 'You cannot edit this story')
    res.redirect('/')
  } catch (err) {
    res.render('error/500')
  }
})

router.post('/', ensureAuth, async (req, res) => {
  try {
    const { title, status, body } = req.body

    let errors = []
    if (!title || !status || !body) {
      errors.push({ msg: 'All fields are required' })
    }

    if (errors.length) {
      return res.render('stories/add', {
        title,
        status,
        body,
        errors,
      })
    }

    const newStory = {
      user: req.user.id,
      title,
      status,
      body,
    }
    await Story.create(newStory)
    res.redirect('/dashboard')
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
      return res.redirect('/dashboard')
    }

    console.log(
      'Something strange. User is trying to modify a story from other user'
    )
    req.flash('errorMsg', 'You cannot edit this story')
    res.render('error/500')
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

router.get('/user/:id', ensureAuth, async (req, res) => {
  try {
    // TO-DO: only show public stories and/or private own ones
    /* const stories2 = await Story.find({
      user: req.params.id,
      $or: [{ status: 'public' }],
    }) */
    const stories = await Story.find({ user: req.params.id })
      .populate('user')
      .lean()
    // User.find({$or:[{region: "NA"},{sector:"Some Sector"}]}, function(err, user)
    res.render('stories/user', { stories })
  } catch (error) {
    return res.render('error/500')
  }
})

export default router
