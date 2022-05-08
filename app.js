import express from 'express'

import './config/passport-local.js'
import { connectDB } from './config/db.js'
import { setMorgan } from './config/morgan.js'
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

setMorgan(app)
setHandlebarsConfig(app)
setFormsConfig(app)
setSession(app)
setFlash(app)
setGlobals(app)
setPassport(app)
setRouter(app)
setServer(app)
