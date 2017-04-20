require('./main.scss')

import m from 'mithril'

const view = vnode => {
  return(
    <div className="main-container container">
      {vnode.children}
    </div>
  )
}

module.exports = {
  view
}
