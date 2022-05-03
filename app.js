import express from 'express'
import { engine } from 'express-handlebars'
import dotenv from 'dotenv'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'

import { connectDB } from './config/db.js'
import routes from './routes/index.js'

dotenv.config({ path: 'config/config.env' })

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
)
// Passport
app.use(passport.initialize())
app.use(passport.session())
const { pathname } = new URL('public', import.meta.url)

app.use(express.static(pathname))
// Routes
app.use('/', routes)

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
