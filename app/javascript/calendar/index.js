require('./index.scss')
require('fullcalendar/dist/fullcalendar.css')

window.$ = window.jQuery = require('jquery')
window.moment = require('moment')
require('fullcalendar')
require('fullcalendar/dist/locale/zh-cn')

import m from 'mithril'
import {calendarList, month, loadList, listHash, getListHash} from 'state/calendar'

const oncreate = vnode => {
  $(vnode.dom).fullCalendar({
    events: calendarList()
  })

  $(vnode.dom).find('.fc-today-button, .fc-prev-button, .fc-next-button').on('click', e => {
    const date = $(vnode.dom).fullCalendar('getDate').startOf('month')
    if (month() === date) return

    month(date)
    loadList()
  })
}

const onupdate = vnode => {
  $(vnode.dom).fullCalendar('removeEvents')
  $(vnode.dom).fullCalendar('renderEvents', calendarList())
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