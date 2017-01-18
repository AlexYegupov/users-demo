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

const defaultState = {
  loggedUser: localStorageLoggedUser.get(),
  loginError: null
}

export const auth = (state=defaultState, action) => {
  //console.log('REDUCER', action.type, action)

  if (action.type === 'LOGIN') {
    if (!action.error) {
      localStorageLoggedUser.set(action.payload)
      return Object.assign({}, state, {loggedUser: action.payload, loginError: null})
    } else {
      localStorageLoggedUser.set(null)
      return Object.assign({}, state, {loggedUser: null, loginError: action.payload})
    }
  }


  if (action.type === 'LOGOUT') {
    // clear localStorage logged user
    if (hasLocalStorage) localStorage.loggedUser = null

    // simply assume no logout error
    return Object.assign({}, state, {loggedUser: null, loginError: null})
  }


  return state
}
