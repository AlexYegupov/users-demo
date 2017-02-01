//import { localStorageLoggedUser } from '../utils/localStorageLoggedUserUtil'
import { localStorageObject, localStoragePresent } from '../utils/localStorageUtil'
import settings from '../settings'
import { isSameUser } from '../utils/userUtil'

function getLoggedUser(state) {
  const emptyUser = {}
  try {
    return state.auth.loggedUser || emptyUser
  } catch (e) {
    if (e instanceof TypeError) return emptyUser
    throw e
  }
}

function loginHandler(state, prevState, store) {
  localStorageObject.set('loggedUser', state.auth.loggedUser)
}

function logoutHandler(state, prevState, store) {
  localStorageObject.set('loggedUser', state.auth.loggedUser)
}

function refreshHandler(state, prevState, store) {
  //const localStorageUser = localStorageObject.get('loggedUser')

  // if (localStoragePresent
  //     && !isSameUser(state.auth.loggedUser, localStorageUser)) {
  //   store.dispatch({
  //     type: 'REFRESH',  //MAYBE just
  //     payload: {
  //       user: localStorageObject.set('loggedUser', state.auth.loggedUser)
  //     }
  //   })

}

function anyHandler(state, prevState, store) {

}

function error403handler(state, prevState, store) {

}

function initHandler(state, prevState, store) {

}



// function saveLoggedUserToLocalStorage(state, prevState) {
//   // save logged user to localStorage
//   const loggedUser = getLoggedUser(state)
//   const prevLoggedUser = getLoggedUser(prevState)
// 
//   if ( loggedUser.slug !== prevLoggedUser.slug ) {
//     localStorageLoggedUser.set(loggedUser)
//     //console.log('LSD: logged user -> LS', localStorage.loggedUser)
//   }
// }
// 
// 
// // TODO: refresh LOGGED user by 1) LS 2)?by request to server
//
// // refresh already logged (as client thinks) user
// function refreshUser(state, prevState, dispatch) {
//   let loggedUser = state.auth.loggedUser // getLoggedUser(state)
// 
//   if ( loggedUser && loggedUser.slug && state.auth.loggedUserRefreshTime
//        && state.auth.loggedUserRefreshTime.valueOf() < Date.now() ) {
//     dispatch({
//       type: 'REFRESH_USER',
//       meta: {
//         apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/session`,
//         fetchOptions: {
//           method: 'GET',
//           credentials: 'include'  // to include cookies in fresponse CR
//         }
//       }
//     })
//   }
// }

// listener that saves loggedUser to localStorage
export function createListeners(store) {
  let prevState = null

  function handleChange() {
    let state = store.getState()

    // // actual listeners...
    // saveLoggedUserToLocalStorage(state, prevState, store.dispatch)
    // 
    // refreshUser(state, prevState, store.dispatch)

    // if (state.auth.loggedUser != prevState.auth.loggedUser)
    // ~~~~  not elegant condition for login/logout (probably middleware?)
    //
    //   loginHandler(state, prevState, store)
    // 
    // if (state.auth. != prevState.auth.)
    // // logoutHandler(state, prevState, store)

    //if (state.auth.loggedUser != prevState.auth.loggedUser)
    // refreshHandler(state, prevState, store)
    // anyHandler(state, prevState, store)
    // error403handler(state, prevState, store)
    // initHandler(state, prevState, store)

    // // w
    // //if (state.auth.test.info !== loggedUser.slug) {
    // if (state.auth.testInfo !== loggedUser.slug) {
    //   console.log('TEST CALLING', state.auth, loggedUser.slug)
    //   store.dispatch({type: 'TEST', info: loggedUser.slug})
    // }


    prevState = state
  }

  store.subscribe(handleChange)
}
