// Middleware that refresh logged user periodically

//import { localStoragePresent, localStorageObject } from '../utils/localStorageUtil'
//import settings from '../settings'
import { saveUserToLocalStorage, refreshLoggedUserAction } from '../actions/authActions'

export const refreshLoggedUser = store => next => action => {
  console.log('lr e1', store.getState(), action)

  // ACTION
  let result = next(action)

  // if (action.type === 'LOGIN') {
  //   store.dispatch( {type: 'TEST', p3: 3, lr: 'lr'} )
  // }

  let state = store.getState()

  // on ANY action refresh logged user by server data
  if (action.type === 'REFRESH_LOGGED_USER') {
    saveUserToLocalStorage(state.auth.loggedUser)
  } else {
    let {loggedUser, loggedUserRefreshTime} = state.auth

    if ( loggedUser && loggedUser.slug && loggedUserRefreshTime
         && loggedUserRefreshTime.valueOf() < Date.now() ) {
      store.dispatch(refreshLoggedUserAction())
    }
  }

  console.log('lr e2', store.getState(), action)

  return result


  // w
  // console.log('LSD before', action.zz)
  // action['kk'] = '11'
  // let result = next(action)
  // console.log('LSD after', action.zz)
  // return result
}
