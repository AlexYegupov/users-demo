// get/save user from localStorage if present

const hasLocalStorage = (typeof(localStorage) !== "undefined")

export const localStorageLoggedUser = {
  get: () => {
    if (hasLocalStorage && localStorage.loggedUser) {
      try {
        let loggedUser = JSON.parse(localStorage.loggedUser)
        console.log('LU', loggedUser)

        // if (loggedUser['obsolete'] < (new Date()).toJSON()) {
        //   return null
        // }

        return loggedUser['user']

      } catch (e) {
        if (e instanceof SyntaxError
            || e instanceof TypeError) return null
        throw e
      }

    }
  },

  set: (user) => {
    if (hasLocalStorage) {
      // let obsolete = new Date()
      // obsolete.setMinutes(obsolete.getMinutes() + 1)

      localStorage.loggedUser = JSON.stringify( {user} )  // , obsolete
    }
  }
}

