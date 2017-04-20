import m from 'mithril'
import stream from 'mithril/stream'
import Form from './form'
import {isTicking, isTickDone} from 'state/tick'

const TICKS = 25 * 60

const oninit = vnode => {
  const state = vnode.state

  state.ticks = stream(TICKS)

  state.stopAClock = e => {
    isTicking(false)
  }
  
  state.showTick = state.ticks.map(v => {
    let minutes = Math.floor(v / 60).toString()
    let seconds = (v % 60).toString()

    minutes = minutes.length === 1 ? '0' + minutes : minutes
    seconds = seconds.length === 1 ? '0' + seconds : seconds

    return <span className="clock-progress--tick">{`${minutes}:${seconds}`}</span>
  })

  state.countProgressPercent = state.ticks.map(v => (TICKS - v) / TICKS * 100)

  state.countDownTicks = () => {
    const tick = state.ticks()
    if (tick > 1) {
      state.ticks(tick - 1)
    } else {
      state.ticks(0)
      setTimeout(() => {
        isTickDone(true)
      }, 0)
    }
    m.redraw()
  }

  state.interval = setInterval(state.countDownTicks, 1000)
}

const view = vnode => {
  if (isTickDone()) {
    return <Form></Form>
  }

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
  clearInterval(vnode.state.interval)
}

export default {
  oninit,
  view,
  onremove
}
