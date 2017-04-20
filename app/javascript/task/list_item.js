import m from 'mithril'
import stream from 'mithril/stream'
import {update} from 'state/task'

const oninit = vnode => {
  const state = vnode.state
  const task = vnode.attrs.task

  state.isEditing = stream(false)
  state.content = stream(task.content)

  state.startEdit = e => {
    state.isEditing(true)
  }

  state.autoFocus = targetVnode => {
    targetVnode.dom.focus()
  }

  state.stopEdit = e => {
    state.isEditing(false)
    state.content(task.content)
  }

  state.updateTask = e => {
    if (e.keyCode === 13) {
      update(task.id, state.content())
      .then(() => {
        task.content = state.content()
        state.isEditing(false)
      })
    }
  }
}

const view = vnode => {
  const state = vnode.state
  const task = vnode.attrs.task

  return(
    <li>
      <input type="checkbox" checked={false} onclick={() => setDone(task.id)} />
      {state.isEditing() ? 
        <input type="text" oncreate={state.autoFocus} onblur={state.stopEdit} onkeypress={state.updateTask}
          value={state.content()} oninput={m.withAttr('value', state.content)} /> : 
        <span onclick={state.startEdit}>{task.content}</span>}
    </li>
  )
}

export default {
  oninit,
  view
}
