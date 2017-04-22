require('bootstrap/dist/css/bootstrap.css')
require('font-awesome/scss/font-awesome.scss')

window.$ = window.jQuery = require('jquery')
require('bootstrap/dist/js/bootstrap.js')

import m from 'mithril'
import {main as Main} from 'container'
import Clock from 'clock'
import Task from 'task'
import Statistics from 'statistics'

m.mount(document.querySelector('#main'), {
  view: vnode => {
    return(
      <Main>
        <div className="flex-container---row flex-container---stack flex-container">
          <Clock></Clock>
          <Task></Task>
        </div>
        <Statistics></Statistics>
      </Main>
    )
  }
})
