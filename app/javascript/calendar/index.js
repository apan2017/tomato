require('./index.scss')
require('fullcalendar/dist/fullcalendar.css')

window.$ = window.jQuery = require('jquery')
window.moment = require('moment')
require('fullcalendar')
require('fullcalendar/dist/locale/zh-cn')

import m from 'mithril'
import {calendarList, loadList, listHash, getListHash} from 'state/calendar'

const oncreate = vnode => {
  $(vnode.dom).fullCalendar({
    events: calendarList()
  })
}

const onupdate = vnode => {
  const newHash = getListHash()
  if (listHash() == newHash) return

  $(vnode.dom).fullCalendar('removeEvents')
  $(vnode.dom).fullCalendar('renderEvents', calendarList())

  listHash(newHash)
}

const view = vnode => {
  return <div></div>
}

module.exports = {
  oninit: loadList,
  onupdate,
  oncreate,
  view
}