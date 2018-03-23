import React from 'react'
import {connect} from 'react-redux'

import Winner from './Winner'
import Vote from './Vote'
import * as actionCreators from '../action_creators'

export class Voting extends React.Component {
  render() {
    return (<div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />}
    </div>)

  }
}

export const VotingContainer = connect(
  (state) => ({
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  }),
  actionCreators
)(Voting)