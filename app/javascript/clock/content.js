import m from 'mithril'
import stream from 'mithril/stream'
import moment from 'moment'
import {loadTodayClocks, todayClocks} from 'state/tick'

const renderContent = () => {
  const today = todayClocks()

  if (!today) {
    return <div className="clock-content--empty">没有内容</div>
  }

  return(
    <div className="clock-content--block">
      <div className="clock-content--header clearfix">
        <span className="clock-content--date pull-left">
          {today.created_date}
        </span>
        <span className="clock-content--total pull-right">
          {`完成了 ${today.total_count} 个番茄`}
        </span>
      </div>
      <ul className="clock-content--list">
        {today.clocks.map(clock => {
          return(
            <li>
              <span className="clock-content--start">{moment(clock.start_at).format('LT')}</span> 
               - 
              <span className="clock-content--end">{moment(clock.end_at).format('LT')}</span>
              <span className="clock-content--description">{clock.description}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const view = vnode => {
  return(
    <div className="clock-content">
      {renderContent()}
    </div>
  )
}

export default {
  oninit: loadTodayClocks,
  view
}
