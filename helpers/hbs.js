import { DateTime } from 'luxon'
import jsdom from 'jsdom'

import User from '../models/User.js'

export const formatDate = (date, format) => {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL)
}

export const renderHTML = (input) => {
  // TO-DO: not actually working, but at least it hides html tags. Need to keep trying
  const newDom = new jsdom.JSDOM(input)
  return newDom.window.document.querySelector('p').textContent
}

export const canEdit = (storyUser, loggedUser) => {
  return storyUser.toString() === loggedUser
}

export const getUserName = /* async */ (userId) => {
  /* const storyUser = await User.findOne({ _id: userId })
  const fullName = `${storyUser.firstName} ${storyUser.lastName}`
  return fullName */
  console.log(userId)
  return `${userId.firstName} ${userId.lastName}`
}

export const preSelect = (selected, options) => {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
    .replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&')
}
