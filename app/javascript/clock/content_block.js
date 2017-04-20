import m from 'mithril'
import stream from 'mithril/stream'

const view = vnode => {
  const item = vnode.attrs.item

  return(
    <div className="clock-content--block">
      <div className="clock-content--header clearfix">
        <span className="clock-content--date pull-left">
          {item.created_data}
        </span>
        <span className="clock-content--total pull-right">
          {`完成了 ${item.total_count} 个番茄`}
        </span>
      </div>
      <ul className="clock-content--list">
        {item.list.map(v => {
          return(
            <li>
              <span className="clock-content--start">{v.start_time}</span> 
               - 
              <span className="clock-content--end">{v.end_time}</span>
              <span className="clock-content--description">{v.description}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default {
  view
}
