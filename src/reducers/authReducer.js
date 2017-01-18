// NOTE: side effect - store logged user to localstore

const hasLocalStorage = (typeof(localStorage) !== "undefined")

let localStorageLoggedUser = {
  get: () => {
    if (hasLocalStorage && localStorage.loggedUser) {
      try {
        return JSON.parse(localStorage.loggedUser)
      } catch (e) {
        if (e instanceof SyntaxError) return null
        throw e
      }

    }
  },

  set: (user) => {
    if (hasLocalStorage) {
      localStorage.loggedUser = JSON.stringify(user)
    }
  }
}

// TODO: create <LoggedUser > component
// (NOOOO, it should be done on store side (i think) that will load user from localStorage/on

console.log('LSD 2: loading localStorage.loggedUser: ', localStorage.loggedUser)

const defaultState = {
  loggedUser: localStorageLoggedUser.get(),  // null
  loginError: null
}

export const auth = (state=defaultState, action) => {
  //console.log('REDUCER', action.type, action)

  if (action.type === 'LOGIN') {
    console.log('LSD: login', action)
    if (!action.error) {
       //!! w LSD localStorageLoggedUser.set(action.payload)
       return Object.assign({}, state, {loggedUser: action.payload, loginError: null})
    } else {
      //!! w LSD localStorageLoggedUser.set(null)
      return Object.assign({}, state, {loggedUser: null, loginError: action.payload})
    }
  }


  if (action.type === 'LOGOUT') {
    // clear localStorage logged user
    if (hasLocalStorage) localStorageLoggedUser.set(null)

    // simply assume no logout error
    return Object.assign({}, state, {loggedUser: null, loginError: null})
  }


  return state
}
