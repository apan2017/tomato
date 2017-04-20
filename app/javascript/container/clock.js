require('./clock.scss')

import m from 'mithril'

const view = vnode => {
  return(
    <div className="clock-container col-lg-5">
      {vnode.children}
    </div>
  )
}

module.exports = {
  view
}
