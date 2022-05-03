import express from 'express'
import { engine } from 'express-handlebars'
import dotenv from 'dotenv'
import morgan from 'morgan'

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

// Routes
app.use('/', routes)

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
