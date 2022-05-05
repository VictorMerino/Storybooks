export const ensureAuth = (req, res, next) => {
  // console.log('req.isAuthenticated', req.isAuthenticated())
  // console.log(req.user)
  if (req.isAuthenticated()) {
    return next()
  } else {
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
