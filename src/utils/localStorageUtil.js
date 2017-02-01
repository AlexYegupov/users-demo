// save/load object to/from localStorage if present

export const localStoragePresent = (typeof(localStorage) !== "undefined")

export const localStorageObject = {
  get: (key) => {
    if (localStoragePresent) {
      try {
        let obj = JSON.parse(localStorage[key])
        return obj
      } catch (e) {
        if (e instanceof SyntaxError
            || e instanceof TypeError) return null
        throw e
      }
    }
  },

  set: (key, obj) => {
    if (localStoragePresent) {
      localStorage[key] = JSON.stringify(obj)
    }
  }
}

