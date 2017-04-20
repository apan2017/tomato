import m from 'mithril'
import stream from 'mithril/stream'
import {list} from 'state/tick'
import Block from './content_block'

const oninit = vnode => {

}

const renderContent = () => {
  if (!list().length) {
    return <div className="clock-content--empty">没有内容</div>
  }

  return list().map(v => <Block item={v}></Block>)
}

const view = vnode => {
  return(
    <div className="clock-content">
      {renderContent()}
    </div>
  )
}

export default {
  oninit,
  view
}
