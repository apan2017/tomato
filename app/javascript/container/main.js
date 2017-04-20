import m from 'mithril'

const view = vnode => {
  return <div className="container">{vnode.children}</div>
}

module.exports = {
  view
}
