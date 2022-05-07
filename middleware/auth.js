export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next()

  req.flash('errorMsg', 'You need to be logged in to see this resource')
  res.redirect('/')
}

export const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect('/dashboard')

  return next()
}
