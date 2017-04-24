require('./nav.scss')

import m from 'mithril'
import stream from 'mithril/stream'

const oninit = vnode => {
  const state = vnode.state

  state.user = stream({})

  state.signOut = () => {
    m.request({
      method: 'DELETE',
      url: '/signout',
      config: xhr => xhr.setRequestHeader('X-CSRF-Token', window.CSRF.token)
    })
    .then(() => document.location.href = '/signin')
  }

  m.request({
    method: 'GET',
    url: '/me'
  })
  .then(data => state.user(data))
}

const view = vnode => {
  return(
    <nav className="nav clearfix">
      <div class="btn-group pull-right profile-btn">
        <button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {vnode.state.user().email} <span class="caret"></span>
        </button>
        <ul class="dropdown-menu">
          <li><a href="javascript:void(0);" onclick={vnode.state.signOut}>退出登录</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default {
  oninit,
  view
}
