import { DateTime } from 'luxon'
import jsdom from 'jsdom'

export const formatDate = (date, format) => {
  console.log(format)
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL)
}

export const renderHTML = (input) => {
  // TO-DO: not actually working, but at least it hides html tags. Need to keep trying
  const newDom = new jsdom.JSDOM(input)
  return newDom.window.document.querySelector('p').textContent
}
