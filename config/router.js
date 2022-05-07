import routes from '../routes/index.js'
import authLocalRoutes from '../routes/auth-local.js'
import storiesRoutes from '../routes/stories.js'

export const setRoutes = (app) => {
  // Routes
  app.use('/', routes)
  app.use('/', authLocalRoutes)
  app.use('/stories', storiesRoutes)
}
