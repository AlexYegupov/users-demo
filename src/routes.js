import React from 'react'
import { Route, Redirect, IndexRedirect } from 'react-router'
//import App from './containers/App'
import UserList from './containers/UserList'
import LoginPage from './containers/LoginPage'
import TestPage from './containers/TestPage'
import UserDetailsPage from './containers/UserDetailsPage'
import NotFoundPage from './containers/NotFoundPage'


//
// function requireAuth(store, nextState, replace) {
//   const state = store.getState()
// 
//   if (!state.auth.loggedUser) {
//     replace({
//       pathname: '/login',
//       state: { nextPathname: nextState.location.pathname },
//     })
//   }
// }

// 
// function onLoginSuccess(nextState, replace) {
//   const state = store.getState()
//   console.log('RO onLoginSuccess', nextState)
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
  <Route path="/" >
    <IndexRedirect to="/users" />
    <Route path="/test" component={TestPage} />
    <Route path="/users" component={UserList} />
    <Route path="/users-create" component={UserDetailsPage} /*onEnter={requireAuth.bind(this, store)} don't use
        TODO: implement "refresh_logged_user && redirect if unlogged behavour"
       */
      />
    <Route path="/users/:slug" component={UserDetailsPage} />
    <Route path="/login" component={LoginPage} />  {/* onLeave={onLoginLeave} */}
    <Redirect from="/loginSuccess" to="/users" />
    <Route path="/404" component={NotFoundPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
)















