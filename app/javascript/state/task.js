import m from 'mithril'
import stream from 'mithril/stream'
import {loadData as loadStatistics} from './statistics'
import {loadList as loadCalendar} from './calendar'

export const content = stream('')

export const list = stream([])

export const loadList = () => {
  m.request({
    method: 'GET',
    url: '/tasks.json'
  }).then(data => {
    list(data)
  })
}

export const create = () => {
  const data = {
    task: {
      content: content()
    }
  }

  m.request({
    method: 'POST',
    url: '/tasks',
    data: data,
    config: xhr => xhr.setRequestHeader('X-CSRF-Token', window.CSRF.token)
  })
  .then(() => {
    content('')
    loadList()
    loadStatistics()
    loadCalendar()
  })
}

export const update = (id, attributes) => {
  const data = {
    task: attributes
  }

  return m.request({
    method: 'PUT',
    url: `/tasks/${id}`,
    data: data,
    config: xhr => xhr.setRequestHeader('X-CSRF-Token', window.CSRF.token)
  })
  .then(() => {
    loadList()
    loadCalendar()
  })
}

export const setDone = id => {
  m.request({
    method: 'PATCH',
    url: `/tasks/${id}/done`,
    config: xhr => xhr.setRequestHeader('X-CSRF-Token', window.CSRF.token)
  })
  .then(() => {
    loadList()
    loadCalendar()
  })
}
