import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from './screens'
import './theme.css'

const App = () => (
  <Router>
    <div className="app">
      <Route exact path="/" component={Home} />
    </div>
  </Router>
)

export default App
