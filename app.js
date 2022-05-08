import express from 'express'
import morgan from 'morgan'

import './config/passport-local.js'
import { connectDB } from './config/db.js'
import { setHandlebarsConfig } from './config/handlebars.js'
import { setFormsConfig } from './config/forms.js'
import { setGlobals } from './config/globals.js'
import { setPassport } from './config/passport.js'
import { setRouter } from './config/router.js'
import { setSession } from './config/session.js'
import { setFlash } from './config/flash.js'
import { setServer } from './config/server.js'

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

setHandlebarsConfig(app)
setFormsConfig(app)
setSession(app)
setFlash(app)
setGlobals(app)
setPassport(app)
setRouter(app)
setServer(app)
