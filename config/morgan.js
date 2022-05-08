import morgan from 'morgan'

export const setMorgan = (app) => {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
}
