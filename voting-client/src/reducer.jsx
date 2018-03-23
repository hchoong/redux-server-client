import {List, Map} from 'immutable'
import { ConnectionState } from './components/ConnectionState';

function setState(state, newState) {
  return state.merge(newState)
}

const vote = (state, entry) => {
  const currentPair = state.getIn(['vote', 'pair'])
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry)
  } else {
    return state
  }
}

const resetVote = (state) => {
  const hasVoted = state.get('hasVoted')
  const currentPair = state.getIn(['vote', 'pair'], List())
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted')
  } else {
    return state
  }
}

const setConnectionState = (state, connectionState, connected) => {
  console.log('setConnectionState')
  return state.set('connection', Map({
    state: connectionState,
    connected
  }))
}
export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state))
    case 'VOTE':
      return vote(state, action.entry)
    case 'SEt_CONNECTION_STATE':
      return setConnectionState(state, action.state, action.connected)
  }
  return state
}