import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import passport from 'passport'
import flash from 'connect-flash'

import './config/passport-local.js'
import { connectDB } from './config/db.js'
import { setHandlebarsConfig } from './config/handlebars.js'
import { setFormsConfig } from './config/forms.js'
import { setGlobals } from './config/globals.js'
import { setRouter } from './config/router.js'
import { setSession } from './config/session.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

setHandlebarsConfig(app)
setFormsConfig(app)
setSession(app)

// Connect flash
app.use(flash())

// Global vars
setGlobals(app)

// Passport
app.use(passport.initialize())
app.use(passport.session())

setRouter(app)

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
