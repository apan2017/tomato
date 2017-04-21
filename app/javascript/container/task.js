require('./task.scss')

import m from 'mithril'

const view = vnode => {
  return(
    <section className="task-container">
      {vnode.children}
    </section>
  )
}

module.exports = {
  view
}

