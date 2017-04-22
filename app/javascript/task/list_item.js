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
      update(task.id, {content: state.content()})
      .then(() => {
        task.content = state.content()
        state.isEditing(false)
      })
    }
  }

  state.initDropdown = targetVnode => {
    $(targetVnode.dom).dropdown()
  }

  state.linkToClockDescription = e => {
    clockDescription(state.content())
  }

  state.updatePriority = (task, priority) => {
    update(task.id, {priority: priority})
  }
}


const view = vnode => {
  const state = vnode.state
  const task = vnode.attrs.task

  return(
    <li className={`task-content--list-item clearfix ${'task-content--list-item---' + task.priority}`}>
      <input type="checkbox" checked={false} onclick={() => setDone(task.id)} />

      {state.isEditing() ? 
        <input type="text" oncreate={vnode => state.autoFocus(task, vnode)}
          onblur={e => state.stopEdit(task)} onkeypress={e => state.updateTask(task, e)}
          value={state.content()} oninput={m.withAttr('value', state.content)} /> : 
        <span onclick={state.startEdit}>{task.content}</span>}
        <div className="dropdown task-content--list-dropdown pull-right">
          <span oncreate={state.initDropdown} data-toggle="dropdown">
            <i class="fa fa-caret-down"></i>
          </span>
          <ul className="dropdown-menu" aria-labelledby="dLabel">
            <li>
              <a href="javascript:void(0);" onclick={vnode.state.linkToClockDescription}>
                添加到番茄描述
              </a>
            </li>
            <li className="task-content--list-priorities">
              <div className="flex-container flex-container---row">
                <a className="task-content--list-priority task-content--list-priority---low"
                  title="低优先级" href="javascript:void(0);"
                  onclick={() => state.updatePriority(task, 'low')}></a>
                <a className="task-content--list-priority task-content--list-priority---normal"
                  title="普通优先级" href="javascript:void(0);"
                  onclick={() => state.updatePriority(task, 'normal')}></a>
                <a className="task-content--list-priority task-content--list-priority---high"
                  title="高优先级" href="javascript:void(0);"
                  onclick={() => state.updatePriority(task, 'high')}></a>
              </div>
            </li>
          </ul>
        </div>

    </li>
  )
}

export default {
  oninit,
  view
}
