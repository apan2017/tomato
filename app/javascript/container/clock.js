require('./clock.scss')

import m from 'mithril'

const view = vnode => {
  return(
    <section className="clock-container">
      {vnode.children}
    </section>
  )
}

module.exports = {
  view
}
