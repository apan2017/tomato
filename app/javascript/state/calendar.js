import m from 'mithril'
import stream from 'mithril/stream'
import moment from 'moment'

export const list = stream([])

export const calendarList = list.map(tasks => {
  const now = moment().format('YYYY-MM-DD hh:mm')

  tasks.forEach(t => {
    t.end = t.end || now

    if (t.is_completed) {
      t.borderColor = t.backgroundColor = '#4db6ac'
    } else if (t.priority === 'high') {
      t.borderColor = t.backgroundColor = '#ef5350'
    }
    else if (t.priority === 'low') {
      t.borderColor = t.backgroundColor = '#e0e0e0'
      t.textColor = '#000'
    } else if (t.priority === 'normal') {
      t.borderColor = t.backgroundColor = '#03a9f4'
    }
  })

  return tasks
})

export const month = stream(moment().startOf('month'))
export const monthFormat = month.map(v => v.format('YYYY-MM-DD') )

export const loadList = () => {
  m.request({
    method: 'GET',
    url: '/tasks/days',
    data: {start: monthFormat()}
  })
  .then(data => list(data))
}
