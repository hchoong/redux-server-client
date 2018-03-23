import React from 'react'
import {connect} from 'react-redux'
import {Map} from 'immutable'

export class ConnectionState extends React.Component {
  isVisible() {
    return !this.props.connected
  }

  getMessage() {
    console.log(this.props)
    return `Not connected (${this.props.state})`
  }

  render() {
    return <div className="connectionState"
      style={{display: this.isVisible() ? 'block': 'none'}}>
      {this.getMessage()}
    </div>
  }
}

export const ConnectionStateContainer = connect(
  state => {
    console.log(state)
    return state.get('connection', Map()).toJS()
  }
)(ConnectionState)