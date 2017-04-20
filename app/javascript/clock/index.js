require('clock/index.scss')

import m from 'mithril'
import stream from 'mithril/stream'
import {clock as Container} from 'container'
import Process from './process'

const oninit = vnode => {
  const state = vnode.state

  state.isTicking = stream(true)

  state.startAClock = e => {
    state.isTicking(true)
  }
}

const renderHeader = vnode => {
  if (vnode.state.isTicking()) {
    return <Process isTicking={vnode.state.isTicking}></Process>
  } else {
    return <button onclick={vnode.state.startAClock} className="btn btn-default clock-btn clock-btn--start">Start</button>
  }
}

const view = vnode => {
  return(
    <Container>
      <div className="clock-header">
        {renderHeader(vnode)}
      </div>
    </Container>
  )
}

module.exports = {
  oninit,
  view
}
