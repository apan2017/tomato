require('bootstrap/dist/css/bootstrap.css')
require('./sign.scss')

import m from 'mithril'
import stream from 'mithril/stream'

export const SignIn = {
  email: stream(''),
  password: stream(''),
  error: stream(),
  oninit: vnode => {
    const state = vnode.state

    state.submit = () => {
      m.request({
        method: 'POST',
        url: '/sessions',
        data: {
          email: state.email(),
          password: state.password()
        },
        config: xhr => xhr.setRequestHeader('X-CSRF-Token', window.CSRF.token)
      })
      .then(() => {
        document.location.href = '/'
      })
      .catch(() => {
        state.error('登录失败，请检查邮箱或密码')
      })
    }
  },
  view: vnode => {
    const state = vnode.state

    return(
      <form class="form">
        <div className="form-group">
          <label>邮箱</label>
          <input type="email" className="form-control" value={state.email()} oninput={m.withAttr('value', state.email)}/>
        </div>
        <div className="form-group">
          <label>密码</label>
          <input type="password" className="form-control" value={state.password()} oninput={m.withAttr('value', state.password)}/>
        </div>
        <div className="clearfix">
          <span className="text-danger">{vnode.state.error()}</span>
          <a href="javascript:void(0);" className="btn btn-default pull-right" onclick={state.submit}>登录</a>
        </div>
      </form>
    )
  },
  onremove: vnode => {
    const state = vnode.state

    state.email('')
    state.password('')
    state.error(null)
  }
}

export const SignUp = {
  email: stream(''),
  password: stream(''),
  passwordConfirm: stream(''),
  errors: stream({}),
  success: stream(''),
  oninit: vnode => {
    const state = vnode.state

    state.submit = () => {
      state.errors({})
      m.redraw()

      m.request({
        method: 'POST',
        url: '/users',
        data: {
          user: {
            email: state.email(),
            password: state.password(),
            password_confirmation: state.passwordConfirm()
          }
        },
        config: xhr => xhr.setRequestHeader('X-CSRF-Token', window.CSRF.token)
      })
      .then(() => state.success('注册成功'))
      .catch(data => state.errors(data))
    }
  },
  view: vnode => {
    const state = vnode.state

    return(
      <form className="form">
        <div className={`form-group ${state.errors().email ? 'has-error' : ''}`}>
          <label className="control-label">邮箱</label>
          <input type="email" className="form-control" value={state.email()} oninput={m.withAttr('value', state.email)}/>
          <span className="help-block">{state.errors().email}</span>
        </div>
        <div className={`form-group ${state.errors().password ? 'has-error' : ''}`}>
          <label className="control-label">密码</label>
          <input type="password" className="form-control" value={state.password()} oninput={m.withAttr('value', state.password)}/>
          <span className="help-block">{state.errors().password}</span>
        </div>
        <div className={`form-group ${state.errors().password_confirmation ? 'has-error' : ''}`}>
          <label className="control-label">确认密码</label>
          <input type="password" className="form-control" value={state.passwordConfirm()}  oninput={m.withAttr('value', state.passwordConfirm)}/>
          <span className="help-block">{state.errors().password_confirmation}</span>
        </div>
        <div className="clearfix">
          <span className="text-success">{vnode.state.success()}</span>
          <a href="javascript:void(0);" className="btn btn-default pull-right" onclick={state.submit}>注册</a>
        </div>
      </form>
    )
  },
  onremove: vnode => {
    const state = vnode.state

    state.email('')
    state.password('')
    state.passwordConfirm('')
    state.errors({})
    state.success('')
  }
}

