import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//import { api } from '../middleware/api'
import { api } from '../middleware/api'
import { refreshLoggedUserEmitter } from '../middleware/refreshLoggedUserEmitter'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    thunk,
    api,
    refreshLoggedUserEmitter
  )
)

export default configureStore
