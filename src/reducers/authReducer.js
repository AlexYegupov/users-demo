const defaultState = {
  user: null,
  loginError: null
}


export const auth = (state=defaultState, action) => {
  //console.log('REDUCER', action.type, action)

  if (action.type === 'LOGIN_SUCCESS') {
    return Object.assign({}, state, {
      user: action.response.user,
      loginError: null
    })
  }

  if (action.type === 'LOGIN_FAILURE') {
    console.log('FF', action)

    return Object.assign({}, state, {
      user: null,
      loginError: action.error
    })
  }

  if (action.type === 'LOGOUT') {
    return Object.assign({}, state, {
      user: null,
      loginError: null
    })
  }

  return state
}
