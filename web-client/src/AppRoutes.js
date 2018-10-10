import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './modules/home/Home'

export default (props) => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
)
