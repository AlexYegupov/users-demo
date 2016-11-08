export const auth = (state={user: null}, action) => {
  //console.log('REDUCER', action.type, action)

  if (action.type === 'LOGIN_SUCCESS') {
    return Object.assign({}, state, {user: action.response.user})
  }

  if (action.type === 'LOGOUT') {
    return Object.assign({}, state, {'user': null})
  }

  return state
}
