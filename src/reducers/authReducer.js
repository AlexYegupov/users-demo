//import { localStorageLoggedUser } from '../utils/localStorageLoggedUserUtil'
//import { localStorageObject } from '../utils/localStorageUtil'


//console.log('LSD LS -> logged user: ', localStorageLoggedUser.get())


//import { store } from '../index'  // get store there?
//import { tryRestoreLoggedUser } from '../actions/authActions'

// problem: is null here
// console.log('ST', store)
// tryRestoreLoggedUser(store)  // here?

const defaultState = {
  loggedUser: null, //localStorageLoggedUser.get(),
  loginError: null,
  loggedUserRefreshTime: null
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
        loginError: action.payload,
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
