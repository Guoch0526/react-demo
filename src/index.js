import React from "react"
import route from 'src/route'
import ReactDom from 'react-dom'
import { Route, Switch, HashRouter } from 'react-router-dom'
import 'src/assets/styles/reset.css'

ReactDom.render(
  <HashRouter>
    <Switch>
      {route.map((page, key) => {
        return <Route key={key} exact={page.exact || false} path={page.path} component={page.component} />
      })}
    </Switch>
  </HashRouter>,
  document.getElementById("root")
)