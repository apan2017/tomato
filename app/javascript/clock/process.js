import m from 'mithril'
import stream from 'mithril/stream'
import moment from 'moment'

import {startTime, endTime, tickCount, currentTickCount, emitter} from 'state/tick'

const oninit = vnode => {
  startTime(moment().format())

  const state = vnode.state

  state.ticks = stream(currentTickCount())

  state.stopAClock = e => {
    emitter.emit('tickStop')
  }
  
  state.showTick = state.ticks.map(v => {
    let minutes = Math.floor(v / 60).toString()
    let seconds = (v % 60).toString()

    minutes = minutes.length === 1 ? '0' + minutes : minutes
    seconds = seconds.length === 1 ? '0' + seconds : seconds

    return <span className="clock-progress--tick">{`${minutes}:${seconds}`}</span>
  })

  state.countProgressPercent = state.ticks.map(v => (tickCount() - v) / tickCount() * 100)

  let currentTime = (new Date()).getTime()

  state.countDownTicks = () => {
    const tick = state.ticks()

    let oldTime = currentTime
    currentTime = (new Date()).getTime()

    if (tick > 0) {
      state.ticks(tick - Math.round((currentTime - oldTime) / 1000))

      clearTimeout(state.timer)
      state.timer = setTimeout(state.countDownTicks, 1000)
      emitter.emit('tickProcess', state.ticks())
    } else {
      state.ticks(0)
      emitter.emit('tickDone')
    }
    m.redraw()
  }

  state.timer = setTimeout(state.countDownTicks, 1000)
}

const view = vnode => {
  return(
    <div class="progress clock-progress">
      <a onclick={vnode.state.stopAClock} href="javascript:void(0);" className="clock-progress--close">x</a>
      <div class="progress-bar" role="progressbar" aria-valuenow={vnode.state.countProgressPercent()}
        aria-valuemin="0" aria-valuemax="100" style={{width: vnode.state.countProgressPercent() + '%'}}>
      </div>
      {vnode.state.showTick()}
    </div>
  )
}

const onremove = vnode => {
  clearTimeout(vnode.state.timer)
}

export default {
  oninit,
  view,
  onremove
}
