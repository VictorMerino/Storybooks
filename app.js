import express from 'express'
import { engine } from 'express-handlebars'
import dotenv from 'dotenv'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

import flash from 'connect-flash'

import { connectDB } from './config/db.js'
import routes from './routes/index.js'
// import authGoogleRoutes from './routes/auth-google.js'
import authLocalRoutes from './routes/auth-local.js'
import storiesRoutes from './routes/stories.js'

dotenv.config()

// import './config/passport-google-oauth.js'
import './config/passport-local.js'

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars helpers
import { formatDate, renderHTML, canEdit, getUserName } from './helpers/hbs.js'
// Handlebars
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    helpers: { formatDate, renderHTML, canEdit, getUserName },
  })
)
app.set('view engine', '.hbs')
app.set('views', './views')

// Bodyparser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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
  next()
})

// Passport
app.use(passport.initialize())
app.use(passport.session())
const { pathname } = new URL('public', import.meta.url)

app.use(express.static(pathname))

// Routes
app.use('/', routes)
// app.use('/auth', authGoogleRoutes)
app.use('/', authLocalRoutes)
app.use('/stories', storiesRoutes)

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
