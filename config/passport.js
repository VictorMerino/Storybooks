import passport from 'passport'

export const setPassport = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
}
