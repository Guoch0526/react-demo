import React from 'react'
import {Route} from 'react-router-dom'

export default (path, config) => Component => {
  return props => <Route path={path} {...config} render={routeProps => <Component {...routeProps} {...props} />} />
}