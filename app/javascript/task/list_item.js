import m from 'mithril'
import stream from 'mithril/stream'
import {update, setDone} from 'state/task'
import {description as clockDescription} from 'state/tick'

const oninit = vnode => {
  const state = vnode.state

  state.isEditing = stream(false)
  state.content = stream(vnode.attrs.task.content)

  state.startEdit = e => {
    state.isEditing(true)
  }

  state.autoFocus = (task, targetVnode) => {
    targetVnode.dom.focus()
    state.content(task.content)
    m.redraw()
    
    setTimeout(() => targetVnode.dom.select(), 0)
  }

  state.stopEdit = task => {
    state.isEditing(false)
  }

  state.updateTask = (task, e) => {
    if (e.keyCode === 13) {
      update(task.id, state.content())
      .then(() => {
        task.content = state.content()
        state.isEditing(false)
      })
    }
  }

  state.linkToClockDescription = e => {
    clockDescription(state.content())
  }
}

const view = vnode => {
  const state = vnode.state
  const task = vnode.attrs.task

  return(
    <li className="clearfix">
      <input type="checkbox" checked={false} onclick={() => setDone(task.id)} />

      {state.isEditing() ? 
        <input type="text" oncreate={vnode => state.autoFocus(task, vnode)}
          onblur={e => state.stopEdit(task)} onkeypress={e => state.updateTask(task, e)}
          value={state.content()} oninput={m.withAttr('value', state.content)} /> : 
        <span onclick={state.startEdit}>{task.content}</span>}

        <span className="pull-right">
          <i class="fa fa-link" onclick={state.linkToClockDescription}></i>
        </span>
    </li>
  )
}

export default {
  oninit,
  view
}
