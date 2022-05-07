import express from 'express'
import methodOverride from 'method-override'
import { engine } from 'express-handlebars'
import dotenv from 'dotenv'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

import flash from 'connect-flash'

import { connectDB } from './config/db.js'

dotenv.config()

import './config/passport-local.js'

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars helpers
import {
  formatDate,
  renderHTML,
  canEdit,
  getUserName,
  preSelect,
} from './helpers/hbs.js'
// Handlebars
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: { formatDate, renderHTML, canEdit, getUserName, preSelect },
  })
)
app.set('view engine', '.hbs')
app.set('views', './views')

// Bodyparser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override to allow PUT and DELETE methods in standard form, via a hidden input
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Express session
app.use(
  session({
    secret: 'keyboard cator',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoose, mongoUrl: process.env.MONGO_URI }),
  })
)

// Connect flash
app.use(flash())

// Global vars
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg')
  res.locals.errorMsg = req.flash('errorMsg')
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})

// Passport
app.use(passport.initialize())
app.use(passport.session())
const { pathname } = new URL('public', import.meta.url)

app.use(express.static(pathname))

import { setRoutes } from './config/router.js'
setRoutes(app)

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
