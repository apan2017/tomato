import m from 'mithril'
import stream from 'mithril/stream'
import moment from 'moment'
import hash from 'object-hash'
import {list as taskList} from 'state/task'

export const list = taskList.map(tasks => {
  const now = moment().format('YYYY-MM-DD hh:mm')

  return tasks.map(t => {
    let obj = {
      id: t.id,
      title: t.content,
      start: t.created_at,
      end: t.completed_at,
      priority: t.priority,
      is_completed: t.is_completed
    }

    obj.end = t.end || now

    if (obj.is_completed) {
      obj.borderColor = obj.backgroundColor = '#4db6ac'
    } else if (obj.priority === 'high') {
      obj.borderColor = obj.backgroundColor = '#ef5350'
    }
    else if (obj.priority === 'low') {
      obj.borderColor = obj.backgroundColor = '#e0e0e0'
      obj.textColor = '#000'
    } else if (obj.priority === 'normal') {
      obj.borderColor = obj.backgroundColor = '#03a9f4'
    }

    return obj
  })
})

export let listHash = stream('')
export const getListHash = taskList.map(list => hash(list))
