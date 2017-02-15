// Middleware that refresh logged user periodically

//import settings from '../settings'
import { refreshLoggedUser } from '../actions/authActions'

export const refreshLoggedUserEmitter = store => next => action => {
  let result = next(action)
  let state = store.getState()

  // emit REFRESH_LOGGED_USER on ANY action if loggedUserRefreshTime is come
  if (action.type !== 'REFRESH_LOGGED_USER') {
    let { loggedUser, loggedUserRefreshTime } = state.auth  //loggedUser

    // refresh already present user from server ("by timer")
    if ( loggedUser && loggedUser.slug
         && loggedUserRefreshTime
         && loggedUserRefreshTime.valueOf() < Date.now() ) {
      store.dispatch(refreshLoggedUser())
    }
  }

  return result

  // w
  // console.log('LSD before', action.zz)
  // action['kk'] = '11'
  // let result = next(action)
  // console.log('LSD after', action.zz)
  // return result

}
