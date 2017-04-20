require('bootstrap/dist/css/bootstrap.css')
window.$ = window.jQuery =require('jquery/dist/jquery.js')
require('bootstrap/dist/js/bootstrap.js')

import m from 'mithril'
import {main as Main} from 'container'
import Clock from 'clock'
import Task from 'task'

m.mount(document.querySelector('#main'), {
  view: vnode => {
    return(
      <Main>
        <div className="row">
          <Clock></Clock>
          <Task></Task>
        </div>
      </Main>
    )
  }
})
