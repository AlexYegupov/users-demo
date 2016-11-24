const defaultState = {
  loggedUser: null,
  loginError: null
}


export const auth = (state=defaultState, action) => {
  //console.log('REDUCER', action.type, action)

  // w
  // if (action.type === 'LOGIN_SUCCESS') {
  //   return Object.assign({}, state, {
  //     user: action.response.user,
  //     loginError: null
  //   })
  // }
  // 
  // if (action.type === 'LOGIN_FAILURE') {
  //   console.log('FF', action)
  // 
  //   return Object.assign({}, state, {
  //     user: null,
  //     loginError: action.error
  //   })
  // }
  // 
  // if (action.type === 'LOGOUT') {
  //   return Object.assign({}, state, {
  //     user: null,
  //     loginError: null
  //   })
  // }

  if (action.type === 'LOGIN') {
    if (!action.error)
      return Object.assign({}, state, {loggedUser: action.payload, loginError: null})
    else
      return Object.assign({}, state, {loggedUser: null, loginError: action.payload})
  }


  if (action.type === 'LOGOUT') {
    // simply assume no logout error
    return Object.assign({}, state, {loggedUser: null, loginError: null})
  }


  return state
}
