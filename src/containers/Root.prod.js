import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
//import routes from '../routes'
import { createRoutes } from '../routes'

import { Router } from 'react-router'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history} routes={createRoutes(store)} />
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}
export default Root
