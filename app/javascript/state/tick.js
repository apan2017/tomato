import m from 'mithril'
import stream from 'mithril/stream'

export const isTicking = stream(false)
export const isTickDone = stream(false)
export const description = stream('')

let item1 = {
  created_data: '4月20日',
  total_count: 1,
  list: [
    {
      start_time: '16:01',
      end_time: '16:28',
      description: '完成tick后显示表单'
    },
    {
      start_time: '16:01',
      end_time: '16:28',
      description: '完成tick后显示表单'
    }
  ]
}

export const list = stream([item1])
