export const api = store => next => action => {
  if (!(action.meta && action.meta.apiCall)) return next(action)
  //console.log('MIDDLEWARE: api. action:', action)

  return fetch(action.meta.apiCall, action.meta.fetchOptions)
    .then( response => {
      //console.log('FE3:', response)

      const contentType = response.headers.get('Content-Type')

      if (response.status !== 204
          && (!contentType || !contentType.includes('application/json'))) {
        //console.log('response is not json', contentType)
        return response.text().then(
          text => Promise.reject({body: text, code: response.status})
        )
      }

      if (!response.ok) {
        //console.log('response is not ok')
        return response.json().then(
          json => Promise.reject(json)
        )
      }

      return response.status === 204 ? {} : response.json()
    })
    .then( json => {
      //console.log('resp OK. json:', json)
      action['payload'] = json

      // exp: response timestamp
      action['meta'].timestamp = new Date().toISOString()

      let result = next(action)
      //console.log('API result', action, result)
      return result
    })
    .catch( error => {
      //console.log('resp Error. json:', error)
      action['error'] = true
      action['payload'] = error
      return next(action)
    })

}
