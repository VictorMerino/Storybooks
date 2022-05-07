export const setGlobals = (app) => {
  app.use((req, res, next) => {
    res.locals.successMsg = req.flash('successMsg')
    res.locals.errorMsg = req.flash('errorMsg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
  })
}
