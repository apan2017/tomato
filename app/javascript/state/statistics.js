import m from 'mithril'
import stream from 'mithril/stream'

export const data = stream({})

export const loadData = () => {
  m.request({
    method: 'GET',
    url: '/statistics.json'
  })
  .then(resp => {
    data(resp)
  })
}

