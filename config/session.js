import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

export const setSession = (app) => {
  app.use(
    session({
      secret: 'keyboard cator',
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({ mongoose, mongoUrl: process.env.MONGO_URI }),
    })
  )
}
