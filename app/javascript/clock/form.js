import m from 'mithril'
import {isTicking, isTickDone, description} from 'state/tick'

const oninit = vnode => {
  const state = vnode.state
  
  state.submit = e => {
    if (e.keyCode === 13) {
      alert(description())

      isTicking(false)
      isTickDone(false)
    }
  }

  state.autoFocus = targetVnode => {
    targetVnode.dom.focus()
  }
}

const view = vnode => {
  return(
    <input type="text" class="form-control" placeholder="输入您完成的任务"
      onkeypress={vnode.state.submit}
      oncreate={vnode.state.autoFocus}
      oninput={m.withAttr('value', description)}
      value={description()} />
  )
}

const onremove = vnode => {
  description('')
}

export default {
  oninit,
  view,
  onremove
}
