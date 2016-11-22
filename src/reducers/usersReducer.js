//import { CALL_API3 } from '../middleware/api3'

// Updates an entity cache in response to any action with response.entities.
export const users =
  //w (state = {users: []}, action) => {
  //(state = {response: []}, action) => {
  (state = {users: []}, action) => {
    //console.log('usersReducer ACTION:', action)

    console.log('REDUCER: state, action:', state, action)

    //if (action.type === 'USERS_REQUEST' && action.result) {
    //if (action.type === CALL_API3 && action.meta.apiCall === 'USERS_LIST' ) {
    if (action.type === 'LOAD_USERS') {
      //return Object.assign({}, state, action) //

      if (!action.error)
        return Object.assign({}, state, {users: action.payload})
      else
        return Object.assign({}, state, {users: [], usersError: action.payload})

      //w return Object.assign({}, state, {users: action.response}) //

      // if (action.result = 'API_SUCCESS') {
      //   //console.log(111111, action.response, [1,2,3])
      //   return Object.assign({}, state, {users: action.response}) //
      // } else {
      //   return Object.assign({}, state, {users: null, }, ) //
      // }

    }


    // if (action.type === 'LOGIN_SUCCESS') {
    //   let r = merge({}, state, action.response )
    //   return r
    // }

    return state
  }


  
