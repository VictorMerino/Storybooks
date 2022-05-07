import { engine } from 'express-handlebars'
import {
  formatDate,
  renderHTML,
  canEdit,
  getUserName,
  preSelect,
} from '../helpers/hbs.js'

export const setHandlebarsConfig = (app) => {
  app.engine(
    '.hbs',
    engine({
      extname: '.hbs',
      helpers: { formatDate, renderHTML, canEdit, getUserName, preSelect },
    })
  )
  app.set('view engine', '.hbs')
  app.set('views', './views')
}
