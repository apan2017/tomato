import m from 'mithril'
import stream from 'mithril/stream'
import moment from 'moment'
import mitt from 'mitt'

const oggtick = new Audio(require('assets/tick1.ogg'))
const oggalarm = new Audio(require('assets/alarm1.ogg'))

export const emitter = mitt()

export const TICKS = 25 * 60
export const BREAK_TICKS = 5 * 60
export const tickCount = stream(TICKS)
export const currentTickCount = tickCount.map(v => v)

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
  .then(() => emitter.emit('tickBreak'))
}

// store

const storeState = currentTickCount => {
  localStorage['tick_state'] = JSON.stringify({
    isTicking: isTicking(),
    isTickDone: isTickDone(),
    isTickBreak: isTickBreak(),
    tickCount: tickCount(),
    currentTickCount: currentTickCount
  })
}

const loadStoredState = () => {
  if (!localStorage['tick_state']) return

  const state = JSON.parse(localStorage['tick_state'])
  isTicking(state.isTicking)
  isTickDone(state.isTickDone)
  isTickBreak(state.isTickBreak)
  tickCount(state.tickCount)
  currentTickCount(state.currentTickCount)
}

const removeStoredState = () => {
  localStorage.removeItem('tick_state')
}

loadStoredState()

// events

emitter.on('tickStart', () => {
  oggalarm.pause()
  removeStoredState()
  tickCount(TICKS)
  isTicking(true)
})

emitter.on('tickProcess', i => {
  oggtick.play()
  setTimeout(() => {
    oggtick.pause()
    oggtick.load()
  }, 500)
  storeState(i)
})

emitter.on('tickStop', () => {
  isTicking(false)
  removeStoredState()
  oggtick.pause()
})

emitter.on('tickDone', () => {
  setTimeout(() => {
    endTime(moment().format())

    if (tickCount() === TICKS) { // ready to create a tomato
      isTickDone(true)
    } else {                     // relax
      isTickBreak(false)
      isTickDone(false)
      isTicking(false)
    }

    removeStoredState()

    oggtick.pause()
    oggalarm.load()
    oggalarm.play()

    m.redraw()
  }, 0)
})

emitter.on('tickBreak', () => {
  loadTodayClocks()
  isTickDone(false)
  isTickBreak(true)
  tickCount(BREAK_TICKS)
  oggalarm.pause()
})
