import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { auth } from './authReducer'
import { users } from './usersReducer'


const rootReducer = combineReducers({
  users,
  auth,
  routing
})

export default rootReducer
