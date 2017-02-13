const defaultState = {
  loggedUser: null, //localStorageLoggedUser.get(),
  loginError: null,
  loggedUserRefreshTime: null
}

let loggedUserRefreshInterval

if (process.env.NODE_ENV === 'production') {
  loggedUserRefreshInterval = 5 * 60 * 1000  // 5 minutes
} else {
  loggedUserRefreshInterval = 15 * 1000  // 15 seconds
}


function getLoggedUserNextRefreshTime() {
  return new Date(Date.now() + loggedUserRefreshInterval)
}

const logoutUserState = {
  loggedUser: null,
  loginError: null,
  loggedUserRefreshTime: null
}

export const auth = (state=defaultState, action) => {
  if (action.type === 'LOGIN') {
    if (!action.error) {
       return Object.assign({}, state, {
         loggedUser: action.payload,
         loginError: null,
         loggedUserRefreshTime: getLoggedUserNextRefreshTime()
       })
    } else {
      return Object.assign({}, state, {
        loggedUser: null,
        loginError: action.payload,
        loggedUserRefreshTime: null,
      })
    }
  }

  if (action.type === 'LOGOUT') {
    // simply assume no logout error
    return Object.assign({}, state, logoutUserState)
  }

  if (action.type === 'REFRESH_LOGGED_USER') {
    if (!action.error) {
      return Object.assign({}, state, {
        loggedUser: action.payload,
        loginError: null,
        loggedUserRefreshTime: getLoggedUserNextRefreshTime()
      })
    } else {
      // clear logged user
      return Object.assign({}, state, {
        loggedUser: null,
        loginError: (action.payload.code === 403) ? null : action.payload,
        loggedUserRefreshTime: null
      })
    }
  }

  if (action.type === 'TEST') {
    console.log('TEST action', action)
    return Object.assign({}, state, {'test': action})
  }

  return state
}
