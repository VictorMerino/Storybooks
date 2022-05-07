import express from 'express'
import methodOverride from 'method-override'

export const setFormsConfig = (app) => {
  // Bodyparser
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  // Method override to allow PUT and DELETE methods in standard form, via a hidden input
  app.use(
    methodOverride((req, res) => {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
    })
  )
}
