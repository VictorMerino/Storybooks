import dotenv from 'dotenv'

dotenv.config()

export const setServer = (app) => {
  const PORT = process.env.PORT || 3000

  app.listen(
    PORT,
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )
}
