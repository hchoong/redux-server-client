import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, HashRouter} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import io from 'socket.io-client'
import reducer from './reducer'
import { setState, setConnectionState} from './action_creators'
import remoteActionMiddleware from './remote_action_middleware'
import {VotingContainer} from './components/Voting'
import {ResultsContainer} from './components/Results'
import {ConnectionStateContainer} from './components/ConnectionState'
import { List, Map } from 'immutable'

const socket = io(`${location.protocol}//${location.hostname}:8090`)
socket.on('state', state =>
  store.dispatch(setState(state))
)

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore)
const store = createStoreWithMiddleware(reducer)

const states = ['connect', 'connect_error', 'connect_timeout', 'reconnect', 'reconnecting', 'reconnect_error', 'reconnect_failed']
states.forEach(ev => {
  socket.on(ev, () => {
    store.dispatch(setConnectionState(ev, socket.connected))
  })
})

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div>
      <ConnectionStateContainer />
        <Route path="/results" render={() => (
            <ResultsContainer />
        )} />
        <Route path="/" render={() => (
            <VotingContainer />
        )} />
        </div>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)