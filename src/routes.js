import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import UserPage2 from './containers/UserPage2'
import TestPage from './containers/TestPage'
import RepoPage from './containers/RepoPage'


export default <Route path="/" component={App}>
  <Route path="/a/:login/:name"
         component={RepoPage} />
  <Route path="/a/:login"
         component={UserPage} />
  <Route path="/test"
         component={TestPage} />
  <Route path="/users"
         component={UserPage2} />
</Route>
