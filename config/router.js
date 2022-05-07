import express from 'express'
import routes from '../routes/index.js'
import authLocalRoutes from '../routes/auth-local.js'
import storiesRoutes from '../routes/stories.js'

export const setRouter = (app) => {
  const { pathname } = new URL('public', import.meta.url)
  app.use(express.static(pathname))
  // Routes
  app.use('/', routes)
  app.use('/', authLocalRoutes)
  app.use('/stories', storiesRoutes)
}
