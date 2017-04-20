require('./index.scss')

import m from 'mithril'
import stream from 'mithril/stream'
import {task as Container} from 'container'
import From from './form'
import List from './list'

const view = vnode => {
  return(
    <Container>
      <div className="task-header">
        <From></From>
      </div>
      <div className="task-content">
        <List></List>
      </div>
    </Container>
  )
}

module.exports = {
  view
}
