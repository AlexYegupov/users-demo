import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { auth } from './authReducer'
import { users } from './usersReducer'
import { questions } from './questionReducer'
import { combineForms } from 'react-redux-form'

const DefaultUser = {firstName: '?', lastName: '', email: ''}

const rootReducer = combineReducers({
  forms: combineForms({
    user: DefaultUser
  }, 'forms'),
  questions,
  users,
  auth,
  routing
})

export default rootReducer
