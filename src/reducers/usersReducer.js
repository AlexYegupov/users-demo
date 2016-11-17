// Updates an entity cache in response to any action with response.entities.
export const users =
  //w (state = {users: []}, action) => {
  (state = {response: []}, action) => {
    //console.log('usersReducer ACTION:', action)

    //console.log('REDUCER: state:', state, 'action:', action)

    if (action.type === 'USERS_REQUEST3' && action.result) {
      return Object.assign({}, state, action) //
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


  
