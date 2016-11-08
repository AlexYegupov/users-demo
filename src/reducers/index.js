import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { auth } from './authReducer'
import { users } from './usersReducer'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = {users: {}, repos: {}}, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}


// // Updates an entity cache in response to any action with response.entities.
// const justResponse = (state = {users: []}, action) => {
//   //console.log('JR ACTION+', action)
// 
//   //console.log('REDUCER: state:', state, 'action:', action)
// 
//   if (action.type === 'USERS_SUCCESS') {
//     let r = merge({}, state, {users: action.response})
//     return r
//   }
// 
//   // if (action.type === 'LOGIN_SUCCESS') {
//   //   let r = merge({}, state, action.response )
//   //   return r
//   // }
// 
//   return state
// }

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  entities,
  //justResponse,
  users,
  auth,
  pagination,
  errorMessage,
  routing
})

export default rootReducer
