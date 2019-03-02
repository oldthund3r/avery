import React from 'react'
import { render } from 'react-dom'
import '@babel/polyfill'
import Root from './root'

const target = document.querySelector('#root')
render(<Root />, target)

if (module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').default
    render(<NextRoot />, target)
  })
}
