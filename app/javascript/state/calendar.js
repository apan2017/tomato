import m from 'mithril'
import stream from 'mithril/stream'

export const list = stream([])

export const loadList = () => {
  m.request({
    method: 'GET',
    url: '/tasks/all.json'
  }).then(data => {
    list(data)
  })
}
