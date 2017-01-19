// get/save user from localStorage if present

const hasLocalStorage = (typeof(localStorage) !== "undefined")

export const localStorageLoggedUser = {
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

