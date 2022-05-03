import express from 'express'
import { engine } from 'express-handlebars'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { connectDB } from './config/db.js'

dotenv.config({ path: 'config/config.env' })

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
