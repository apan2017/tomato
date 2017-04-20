import m from 'mithril'
import stream from 'mithril/stream'

const TICKS = 25 * 60

const oninit = vnode => {
  const state = vnode.state

  state.ticks = stream(TICKS)

  state.stopAClock = e => {
    vnode.attrs.isTicking(false)
  }
  
  state.showTick = state.ticks.map(v => {
    let minutes = Math.floor(v / 60).toString()
    let seconds = (v % 60).toString()

    minutes = minutes.length === 1 ? '0' + minutes : minutes
    seconds = seconds.length === 1 ? '0' + seconds : seconds

    return <span>{`${minutes}:${seconds}`}</span>
  })

  state.countDownTicks = () => {
    const tick = state.ticks()
    state.ticks(tick - 1)
    m.redraw()
  }

  state.interval = setInterval(state.countDownTicks, 1000)
}

const view = vnode => {
  return <a onclick={vnode.state.stopAClock} className="btn btn-default clock-btn clock-btn--process">{vnode.state.showTick()}</a>
}

const onremove = vnode => {
  clearInterval(vnode.state.interval)
}

export default {
  oninit,
  view,
  onremove
}
