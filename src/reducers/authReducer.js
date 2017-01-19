import { localStorageLoggedUser } from '../utils/localStorageLoggedUserUtil'

//console.log('LSD LS -> loggedUser: ', localStorageLoggedUser.get())
const defaultState = {
  loggedUser: localStorageLoggedUser.get(),
  loginError: null
}

export const auth = (state=defaultState, action) => {
  if (action.type === 'LOGIN') {
    if (!action.error) {
       return Object.assign({}, state, {loggedUser: action.payload, loginError: null})
    } else {
      return Object.assign({}, state, {loggedUser: null, loginError: action.payload})
    }
  }


  if (action.type === 'LOGOUT') {
    // simply assume no logout error
    return Object.assign({}, state, {loggedUser: null, loginError: null})
  }


  return state
}
