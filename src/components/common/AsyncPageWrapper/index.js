import React from 'react'

let AsyncPageWrapper = getComponent => (
  class AsyncComponent extends React.Component {
    state = {
      Component: null,
    }

    componentWillMount() {
      let {Component} = this.state

      if (!Component) {
        getComponent().then(Component => {
          this.setState({Component})
        })
      }
    }

    render() {
      let {Component} = this.state
      return Component ? <Component {...this.props} /> : null
    }
  }
)

export default AsyncPageWrapper
