// Updates an entity cache in response to any action with response.entities.
export const users =
  (state = {users: []}, action) => {
  //console.log('JR ACTION+', action)

  //console.log('REDUCER: state:', state, 'action:', action)

  if (action.type === 'USERS_SUCCESS') {
    console.log(111111, action.response, [1,2,3])
    let r = Object.assign({}, state, {users: action.response}) //
    return r
  }

  // if (action.type === 'LOGIN_SUCCESS') {
  //   let r = merge({}, state, action.response )
  //   return r
  // }

  return state
}


  
