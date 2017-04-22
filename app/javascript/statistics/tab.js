import m from 'mithril'
import stream from 'mithril/stream'
import {data, loadData} from 'state/statistics'

const view = vnode => {

  return(
    <ul className="statistics-tab">
      <li>
        <div className="statistics-tab--title">统计</div>
        <div className="statistics-tab--desc">一周累计</div>
        <div className="statistics-tab--counter">{data().week_clock_count}</div>
      </li>
      <li>
        <div className="statistics-tab--title">目标</div>
        <div className="statistics-tab--desc">今日目标</div>
        <div className="statistics-tab--counter">{data().today_clock_count}/8</div>
      </li>
      <li>
        <div className="statistics-tab--title">番茄</div>
        <div className="statistics-tab--desc">历史记录</div>
        <div className="statistics-tab--counter">{data().total_clock_count}</div>
      </li>
      <li>
        <div className="statistics-tab--title">任务</div>
        <div className="statistics-tab--desc">历史记录</div>
        <div className="statistics-tab--counter">{data().total_tasks_count}</div>
      </li>
    </ul>
  )
}

export default {
  oninit: loadData,
  view
}
