import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { createListeners } from './store/listeners'

const store = configureStore() // w {auth: {loggedUser: loggedUser}}
const history = syncHistoryWithStore(browserHistory, store)

createListeners(store)


render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)


