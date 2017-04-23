require('./index.scss')
require('fullcalendar/dist/fullcalendar.css')

window.$ = window.jQuery = require('jquery')
window.moment = require('moment')
require('fullcalendar')
require('fullcalendar/dist/locale/zh-cn')

import m from 'mithril'

const oncreate = vnode => {
  $(vnode.dom).fullCalendar()
}

const view = vnode => {
  return <div></div>
}


module.exports = {
  oncreate,
  view
}