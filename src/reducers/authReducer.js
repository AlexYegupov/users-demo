import { localStorageLoggedUser } from '../utils/localStorageLoggedUserUtil'

//console.log('LSD LS -> logged user: ', localStorageLoggedUser.get())

const defaultState = {
  loggedUser: localStorageLoggedUser.get(),
  loginError: null,
  test: {info: null}
}

function getLoggedUserNextRefreshTime() {
  return new Date(Date.now() + 15*1000) // should be 1 minute !!
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
        loggedUserRefreshTime: null
      })
    }
  }

  if (action.type === 'LOGOUT') {
    // simply assume no logout error
    return Object.assign({}, state, logoutUserState)
  }

  if (action.type === 'REFRESH_USER') {

    console.log('REFRESH', action)

    if (!action.error) {
      return Object.assign({}, state, {
        loggedUserRefreshTime: getLoggedUserNextRefreshTime()

      })
    } else {
      // clear logged user
      return Object.assign({}, state, logoutUserState)
    }
  }


  return state
}
