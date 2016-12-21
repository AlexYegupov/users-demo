//import { CALL_API3 } from '../middleware/api3'

// Updates an entity cache in response to any action with response.entities.
export const users =
  (state={users:[]}, action) => {
    console.log('usersReducer ACTION:', action)

    if (action.type === 'LOAD_USERS') {
      if (!action.error)
        return Object.assign({}, state, {users: action.payload, usersError: null})
      else
        return Object.assign({}, state, {users: [], usersError: action.payload})
    }

    if (action.type === 'LOAD_USER') {
      if (!action.error) {
        let user = action.payload
        user._timestamp = action.meta.timestamp
        return Object.assign({}, state, {user, userError: null})
      } else {
        return Object.assign({}, state, {user: null, userError: action.payload})
      }
    }

    if (action.type === 'PATCH_USER') {
      if (!action.error) {
        let user = action.payload
        user._isPatched = true
        user._timestamp = action.meta.timestamp
        return Object.assign({}, state, {user, userError: null})
      } else {
        return Object.assign({}, state, {user: null, userError: action.payload})
      }
    }

    if (action.type === 'INIT_NEW_USER') {
      const emptyUser = {slug: '', login: '', name: '', _isNew: true,
                         _timestamp: new Date().toISOString()}
      return Object.assign({}, state, {user: emptyUser, userError: null})
    }

    if (action.type === 'CREATE_USER') {
      if (!action.error) {
        let user = action.payload
        user._isCreated = true
        user._timestamp = action.meta.timestamp
        return Object.assign({}, state, {user, userError: null})
      } else {
        return Object.assign({}, state, {user: null, userError: action.payload})
      }
    }

    if (action.type === 'DELETE_USER') {
      console.log("DDD UUU", state.users, action, action.payload.deletedUserSlug)
      if (!action.error) {
        // delete deleted on server user from "users" array
        let newState = Object.assign({}, state)
        newState.users = state.users.filter(
          item => item.slug !== action.payload.deletedUserSlug)
        return newState
      } else {
        return Object.assign({}, state, {user: null, usersError: action.payload})
      }
    }

    return state
  }


  
