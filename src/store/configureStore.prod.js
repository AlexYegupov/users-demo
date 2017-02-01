import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//import { api } from '../middleware/api'
import { api } from '../middleware/api'
import { refreshLoggedUser } from '../middleware/refreshLoggedUser'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    thunk,
    refreshLoggedUser,
    api,
  )
)

export default configureStore
