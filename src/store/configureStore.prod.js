import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//import { api } from '../middleware/api'
import { api3 } from '../middleware/api3'
//import { localStorageData } from '../middleware/localStorageData'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(
    thunk,
    api3,
    //localStorageData
  )
)

export default configureStore
