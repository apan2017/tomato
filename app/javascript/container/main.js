require('./main.scss')

import m from 'mithril'
import Nav from './nav'

const view = vnode => {
  return(
    <div className="main-container container">
      <Nav></Nav>
      {vnode.children}
    </div>
  )
}

module.exports = {
  view
}
