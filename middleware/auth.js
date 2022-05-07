export const ensureAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    req.flash('errorMsg', 'You need to be logged in to see this resource')
    res.redirect('/')
  }
}

export const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard')
  } else {
    return next()
  }
}
