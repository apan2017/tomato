require('./clock.scss')

import m from 'mithril'

const view = vnode => {
  return(
    <div className="row">
      <div className="clock-container col-lg-6">
        {vnode.children}
      </div>
    </div>
  )
}

module.exports = {
  view
}
