require('bootstrap/dist/css/bootstrap.css')
window.$ = window.jQuery =require('jquery/dist/jquery.js')
require('bootstrap/dist/js/bootstrap.js')

import m from 'mithril'
import {main} from 'container'
import clock from 'clock'

m.mount(document.querySelector('#main'), {
  view: vnode => {
    return m(main, m(clock))
  }
})
