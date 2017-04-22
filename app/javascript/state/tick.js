import m from 'mithril'
import stream from 'mithril/stream'
import moment from 'moment'
import mitt from 'mitt'
import {loadData as loadStatistics} from './statistics'

export const emitter = mitt()

export const TICKS = 2
export const BREAK_TICKS = 5 * 60
export const tickCount = stream(TICKS)

export const isTicking = stream(false)
export const isTickDone = stream(false)
export const isTickBreak = stream(false)
export const description = stream('')

export const startTime = stream()
export const endTime = stream()

export const todayClocks = stream()

export const loadTodayClocks = () => {
  m.request({
    method: 'GET',
    url: '/clocks/today.json'
  })
  .then(data => {
    todayClocks(data)
  })
}

export const create = () => {
  const data = {
    clock: {
      description: description(),
      start_at: startTime(),
      end_at: endTime()
    }
  }

  m.request({
    method: 'POST',
    url: '/clocks',
    data: data,
    config: xhr => xhr.setRequestHeader('X-CSRF-Token', window.CSRF.token)
  })
  .then(() => emitter.emit('created'))
}


emitter.on('tickDone', () => {
  setTimeout(() => {
    endTime(moment().format())

    if (tickCount() === TICKS) {
      isTickDone(true)
    } else {
      isTickBreak(false)
      isTickDone(false)
      isTicking(false)
    }
    
    m.redraw()
  }, 0)
})

emitter.on('created', () => {
  loadTodayClocks()
  isTickDone(false)
  isTickBreak(true)
  loadStatistics()
})