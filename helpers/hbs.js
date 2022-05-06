import { DateTime } from 'luxon'

export const formatDate = (date, format) => {
  console.log(format)
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_FULL)
}
