import m from 'mithril'
import {SignIn, SignUp} from 'container/sign'

const Container = {
  oninit: vnode => {
    const state = vnode.state

    state.activeIndex = 0
    state.selectTab = index => {
      state.activeIndex = index
    }
  },
  view: vnode => {
    const state = vnode.state

    return(
      <div className="sign-container">
        <ul class="sign-tabs">
          <li className={state.activeIndex === 0 ? 'active' : ''} onclick={() => state.selectTab(0)}>登录</li>
          <li className={state.activeIndex === 1 ? 'active' : ''} onclick={() => state.selectTab(1)}>注册</li>
        </ul>
        <div className="sign-content">
          {vnode.state.activeIndex === 0 ? m(SignIn) : m(SignUp)}
        </div>
      </div>
    )
  }
}

m.mount(document.querySelector('#main'), Container)
