require('clock/index.scss')

import m from 'mithril'
import stream from 'mithril/stream'
import {clock as Container} from 'container'
import Process from './process'
import Content from './content'
import {isTicking} from 'state/tick'

const oninit = vnode => {
  const state = vnode.state

  state.startAClock = e => {
    isTicking(true)
  }
}

const renderHeader = vnode => {
  if (isTicking()) {
    return <Process></Process>
  } else {
    return <button onclick={vnode.state.startAClock} className="btn btn-default clock-btn clock-btn---start">Start</button>
  }
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
