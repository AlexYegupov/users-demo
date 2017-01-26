import { localStorageLoggedUser } from '../utils/localStorageLoggedUserUtil'
import settings from '../settings'

function getLoggedUser(state) {
  const emptyUser = {}
  try {
    return state.auth.loggedUser || emptyUser
  } catch (e) {
    if (e instanceof TypeError) return emptyUser
    throw e
  }
}

function saveLoggedUserToLocalStorage(state, prevState) {
  // save logged user to localStorage
  const loggedUser = getLoggedUser(state)
  const prevLoggedUser = getLoggedUser(prevState)

  if ( loggedUser.slug !== prevLoggedUser.slug ) {
    localStorageLoggedUser.set(loggedUser)
    //console.log('LSD: logged user -> LS', localStorage.loggedUser)
  }
}

// refresh already logged (as client thinks) user
function refreshUser(state, prevState, dispatch) {
  let loggedUser = state.auth.loggedUser // getLoggedUser(state)

  if ( loggedUser && loggedUser.slug && state.auth.loggedUserRefreshTime
       && state.auth.loggedUserRefreshTime.valueOf() < Date.now() ) {
    dispatch({
      type: 'REFRESH_USER',
      meta: {
        apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/session`,
        fetchOptions: {
          method: 'GET',
          credentials: 'include'  // to include cookies in fresponse CR
        }
      }
    })
  }

}

// listener that saves loggedUser to localStorage
export function createListeners(store) {
  let prevState = null

  function handleChange() {
    let state = store.getState()

    // actual listeners...
    saveLoggedUserToLocalStorage(state, prevState, store.dispatch)

    refreshUser(state, prevState, store.dispatch)

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
