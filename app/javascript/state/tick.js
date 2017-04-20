import m from 'mithril'
import stream from 'mithril/stream'
import moment from 'moment'

export const TICKS = 25 * 60

export const isTicking = stream(false)
export const isTickDone = stream(false)
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
  .then(() => {
    isTicking(false)
    isTickDone(false)
    
    loadTodayClocks()
  })
}
