import express from 'express'
import methodOverride from 'method-override'
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

import { setHandlebarsConfig } from './config/handlebars.js'
setHandlebarsConfig(app)

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
import { setGlobals } from './config/globals.js'
setGlobals(app)

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
