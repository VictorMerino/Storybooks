export const ensureAuth = (req, res, next) => {
  // console.log('req.isAuthenticated', req.isAuthenticated())
  // console.log(req.user)
  if (req.isAuthenticated()) {
    return next()
  } else {
    req.flash('errorMsg', 'You need to be logged in to see this resource')
    res.redirect('/')
  }
}

export const ensureGuest = (req, res, next) => {
  console.log('req.isAuthenticated', req.isAuthenticated())
  if (req.isAuthenticated()) {
    res.redirect('/dashboard')
  } else {
    return next()
  }
}
