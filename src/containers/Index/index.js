import React, {Component} from 'react'
import './index.less'

export default class Index extends Component {
  componentDidMount() {
    console.log(this)
  }

  render() {
    return (
      <div>Index</div>
    )
  }
}