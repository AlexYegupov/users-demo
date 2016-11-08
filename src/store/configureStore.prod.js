import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { api } from '../middleware/api'
import { api2 } from '../middleware/api2'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, api, api2)
)

export default configureStore
