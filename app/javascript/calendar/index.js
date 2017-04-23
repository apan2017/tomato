require('./index.scss')
require('fullcalendar/dist/fullcalendar.css')

window.$ = window.jQuery = require('jquery')
window.moment = require('moment')
require('fullcalendar')
require('fullcalendar/dist/locale/zh-cn')

import m from 'mithril'
import hash from 'object-hash'
import {list, loadList} from 'state/calendar'

const oninit = vnode => {
  loadList()
}

const oncreate = vnode => {
  vnode.state.listHash = hash(list())

  $(vnode.dom).fullCalendar({
    events: list()
  })
}

const onupdate = vnode => {
  if (hash(list()) == vnode.state.listHash) return

  const now = moment().format('YYYY-MM-DD hh:mm')
  list().forEach(t => {
    t.end = t.end || now

    if (t.priority === 'high') {
      t.borderColor = t.backgroundColor = '#ef5350'
    }
    else if (t.priority === 'low') {
      t.borderColor = t.backgroundColor = '#e0e0e0'
      t.textColor = '#000'
    }
    else {
      t.borderColor = t.backgroundColor = '#03a9f4'
    }
  })
  $(vnode.dom).fullCalendar('removeEvents')
  $(vnode.dom).fullCalendar('renderEvents', list())

  vnode.state.listHash = hash(list())
}

const view = vnode => {
  return <div></div>
}


module.exports = {
  onupdate,
  oninit,
  oncreate,
  view
}