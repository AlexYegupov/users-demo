import { localStorageLoggedUser } from '../utils/localStorageLoggedUserUtil'

// listener that saves loggedUser to localStorage
function createLoggedUserLocalStorageListener(store) {
  let prevState = null

  function getLoggedUser(state) {
    const emptyUser = {}
    try {
      return state.auth.loggedUser || emptyUser
    } catch (e) {
      if (e instanceof TypeError) return emptyUser
      throw e
    }
  }

  function handleChange() {
    let state = store.getState()

    // save logged user to localStorage
    const loggedUser = getLoggedUser(state)
    const prevLoggedUser = getLoggedUser(prevState)
    if (loggedUser.login !== prevLoggedUser.login) {
      localStorageLoggedUser.set(loggedUser)
      //console.log('LSD: loggedUser -> LS', localStorage.loggedUser)
    }

    prevState = state
  }

  store.subscribe(handleChange)
}



export function createListeners(store) {
  createLoggedUserLocalStorageListener(store)
}

