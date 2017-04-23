import m from 'mithril'
import stream from 'mithril/stream'
import {todoList, loadList, setDone} from 'state/task'
import ListItem from './list_item'

const view = vnode => {
  if (!todoList().length) {
    return <div className="task-content--empty">没有任务</div>
  }

  return(
    <ul className="task-content--list">
      {todoList().map(task => {
        return <ListItem task={task}></ListItem>
      })}
    </ul>
  )
}

export default {
  oninit: loadList,
  view
}
