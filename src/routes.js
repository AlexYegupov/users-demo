import React from 'react'
import { Route, Redirect } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import UserPage2 from './containers/UserPage2'
import LoginPage from './containers/LoginPage'
//import TestPage from './containers/TestPage'
//import RepoPage from './containers/RepoPage'
import UserDetailsPage from './containers/UserDetailsPage'
import NotFoundPage from './containers/NotFoundPage'


function requireAuth(store, nextState, replace) {
  const state = store.getState()
  console.log('RO requireAuth', state, nextState)

  if (!state.auth.loggedUser) {
    console.log('RO 2', nextState.location.pathname)
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    })
  }
}

// function onLoginSuccess(nextState, replace) {
//   const state = store.getState()
//   console.log('RO onLoginSuccess', nextState)
// 
//   // TODO: add default redirect
//   
//   if (!state.auth.loggedUser) {
//   replace({
//     pathname: nextState.location.state,
//     //state: { nextPathname: nextState.location.pathname }
//   })
//   //}
// 
// }

// function onLoginLeave(prevState) {
//   console.log('RO onLoginLeave', prevState)
// }


export const createRoutes = (store) => (
  <Route path="/" component={App}>
    {/* <Route path="/a/:login/:name" component={RepoPage} /> */}
    {/* <Route path="/a/:login" component={UserPage} /> */}
    <Route path="/users" component={UserPage2} />
    <Route path="/users-create" component={UserDetailsPage} onEnter={requireAuth.bind(this, store)} />
    <Route path="/users/:slug" component={UserDetailsPage} />
    <Route path="/login" component={LoginPage} />  {/* onLeave={onLoginLeave} */}
    {/* <Route path="/loginSuccess" onEnter={onLoginSuccess} /> */}
    <Redirect from='/loginSuccess' to='/users' />
    <Route path="/404" component={NotFoundPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)
