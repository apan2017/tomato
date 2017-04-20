import m from 'mithril'
import {create, description, startTime, endTime} from 'state/tick'

const oninit = vnode => {
  const state = vnode.state
  
  state.submit = e => {
    if (e.keyCode === 13) {
      create()
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
  startTime(null)
  endTime(null)
}

export default {
  oninit,
  view,
  onremove
}
