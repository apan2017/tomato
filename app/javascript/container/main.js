require('./main.scss')

import m from 'mithril'

const view = vnode => {
  return(
    <div className="main-container container">
      <div className="flex-container---row flex-container---stack flex-container">
        {vnode.children}
      </div>
    </div>
  )
}

module.exports = {
  view
}
