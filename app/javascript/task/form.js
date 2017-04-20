import m from 'mithril'
import {content, create, update} from 'state/task'

const oninit = vnode => {
  const state = vnode.state

  state.submit = e => {
    if (e.keyCode === 13) {
      create()
    }
  }
}

const view = vnode => {
  return(
    <input type="text" class="form-control" placeholder="添加新任务"
      onkeypress={vnode.state.submit}
      oninput={m.withAttr('value', content)}
      value={content()} />
  )
}

export default {
  oninit,
  view
}
