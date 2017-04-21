require('clock/index.scss')

import m from 'mithril'
import stream from 'mithril/stream'
import {clock as Container} from 'container'
import Process from './process'
import Content from './content'
import Form from './form'
import {isTicking, isTickDone, isTickBreak, TICKS, BREAK_TICKS, tickCount} from 'state/tick'

const oninit = vnode => {
  const state = vnode.state

  state.startAClock = e => {
    isTicking(true)
  }
}

const renderHeader = vnode => {
  if (isTickBreak()) {
    tickCount(BREAK_TICKS)
    return <Process></Process>
  }

  if (isTickDone()) {
    return <Form></Form>
  }

  if (isTicking()) {
    tickCount(TICKS)
    return <Process></Process>
  }
  
  return <button onclick={vnode.state.startAClock} className="btn btn-default clock-btn clock-btn---start">Start</button>
}

const view = vnode => {
  return(
    <Container>
      <div className="clock-header">
        {renderHeader(vnode)}
      </div>
      <Content></Content>
    </Container>
  )
}

module.exports = {
  oninit,
  view
}
