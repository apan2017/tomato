import m from 'mithril'
import stream from 'mithril/stream'

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
  })
}

export const update = (id, content) => {
  const data = {
    task: {
      content: content
    }
  }

  return m.request({
    method: 'PUT',
    url: `/tasks/${id}`,
    data: data,
    config: xhr => xhr.setRequestHeader('X-CSRF-Token', window.CSRF.token)
  })
  .then(() => {
    loadList()
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
  })
}
