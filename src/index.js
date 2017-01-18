import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'

// // ---------------------
// console.log('LSD 4', localStorage)
// 
const hasLocalStorage = (typeof(localStorage) !== "undefined")
// 
// let loggedUser = null
// 
// if (hasLocalStorage && localStorage.loggedUser) {
//   try {
//     loggedUser = JSON.parse(localStorage.loggedUser)
//   } catch (e) {
//     if (e instanceof SyntaxError) {
//       loggedUser = null
//     } else {
//       throw e
//     }
//   }
// 
// }


// ------------------------

const store = configureStore() // w {auth: {loggedUser: loggedUser}}
const history = syncHistoryWithStore(browserHistory, store)


// --------------
function handleChange() {
  //let previousValue = currentValue
  let state = store.getState()

  if (hasLocalStorage) {
    localStorage.loggedUser = JSON.stringify(state.auth.loggedUser)
    console.log('LSD 2: saving localStorage.loggedUser: ', localStorage.loggedUser)
  }

  // if (previousValue !== currentValue) {
  //   console.log('Some deep nested property changed from', previousValue, 'to', currentValue)
  // }

}

store.subscribe(handleChange)  //http://redux.js.org/docs/api/Store.html#subscribe

// -------------------------


render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)


