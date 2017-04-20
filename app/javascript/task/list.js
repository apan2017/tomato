import m from 'mithril'
import stream from 'mithril/stream'
import {list, loadList, setDone} from 'state/task'
import ListItem from './list_item'

const oninit = vnode => {
  loadList()
}

const view = vnode => {
  if (!list().length) {
    return <div className="task-content--empty">没有任务</div>
  }

  return(
    <ul className="task-content--list">
      {list().map(task => {
        return <ListItem task={task}></ListItem>
      })}
    </ul>
  )
}

export default {
  oninit,
  view
}
