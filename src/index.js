import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { localStorageLoggedUser } from './utils/localStorageLoggedUserUtil'


const store = configureStore() // w {auth: {loggedUser: loggedUser}}
const history = syncHistoryWithStore(browserHistory, store)


function createListener() {
  let prevState = null

  function getLoggedUser(state) {
    const emptyUser = {}
    try {
      return state.auth.loggedUser || emptyUser
    } catch (e) {
      if (e instanceof TypeError) return emptyUser
      throw e
    }
  }

  function handleChange() {
    let state = store.getState()

    // save logged user to localStorage
    const loggedUser = getLoggedUser(state)
    const prevLoggedUser = getLoggedUser(prevState)
    if (loggedUser.login !== prevLoggedUser.login) {
      localStorageLoggedUser.set(loggedUser)
      //console.log('LSD: loggedUser -> LS', localStorage.loggedUser)
    }

    prevState = state
  }
  return handleChange
}

store.subscribe(createListener())



render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)


