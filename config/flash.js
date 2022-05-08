import flash from 'connect-flash'

export const setFlash = (app) => {
  // Connect flash
  app.use(flash())
}
