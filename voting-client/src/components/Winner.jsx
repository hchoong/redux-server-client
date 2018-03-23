import React from 'react'

export default class Winner extends React.Component {
  render() {
    const {winner} = this.props
    return (
      <div className="winner">
        Winner is {winner}!
      </div>
    )
  }
}
