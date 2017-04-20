import m from 'mithril'
import stream from 'mithril/stream'
import {list, loadList, setDone} from 'state/task'

const oninit = vnode => {
  loadList()
}

const view = vnode => {
  if (!list().length) {
    return <div className="task-content--empty">没有任务</div>
  }

  return(
    <ul className="task-content--list">
      {list().map(v => {
        return <li><input type="checkbox" checked={false} onclick={() => setDone(v.id)} /> {v.content}</li>
      })}
    </ul>
  )
}

export default {
  oninit,
  view
}
