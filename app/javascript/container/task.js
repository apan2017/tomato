require('./task.scss')

import m from 'mithril'

const view = vnode => {
  return(
    <div className="task-container col-lg-6">
      {vnode.children}
    </div>
  )
}

module.exports = {
  view
}

