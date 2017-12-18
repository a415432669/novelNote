import moment from 'moment'

moment.locale('zh-cn')

export function momentTime (timeStamp) {
  return moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a')
}

export function htmlFormate (html) {
  return html.replace(/\n/g, '<br />')
}
