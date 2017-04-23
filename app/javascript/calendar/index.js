require('./index.scss')
require('fullcalendar/dist/fullcalendar.css')

window.$ = window.jQuery = require('jquery')
window.moment = require('moment')
require('fullcalendar')
require('fullcalendar/dist/locale/zh-cn')

import m from 'mithril'
import {list, listHash, getListHash} from 'state/calendar'

const oncreate = vnode => {
  $(vnode.dom).fullCalendar({
    events: list()
  })
}

const onupdate = vnode => {
  const newHash = getListHash()
  if (listHash() == newHash) return

  $(vnode.dom).fullCalendar('removeEvents')
  $(vnode.dom).fullCalendar('renderEvents', list())

  listHash(newHash)
}

const view = vnode => {
  return <div></div>
}


module.exports = {
  onupdate,
  oncreate,
  view
}