import m from 'mithril'
import stream from 'mithril/stream'
import {emitter as TickEmitter} from './tick'
import {emitter as TaskEmitter} from './task'

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

TickEmitter.on('create', loadData)
TaskEmitter.on('create', loadData)
