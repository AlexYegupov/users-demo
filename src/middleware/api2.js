//import { Schema, arrayOf, normalize } from 'normalizr'
//import { camelizeKeys } from 'humps'

// // Extracts the next page URL from Github API response.
// const getNextPageUrl = response => {
//   const link = response.headers.get('link')
//   if (!link) {
//     return null
//   }
// 
//   const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1)
//   if (!nextLink) {
//     return null
//   }
// 
//   return nextLink.split(';')[0].slice(1, -1)
// }

// TODO: normalize
const API_ROOT = 'https://api.github.com/'


// // Fetches an API response and normalizes the result JSON according to schema.
// // This makes every API response have the same shape, regardless of how nested it was.
// const callApi = (endpoint, schema) => {
// 
//   // TODO: fix
//   let fullUrl
//   if (endpoint.includes('http')) {
//     fullUrl = endpoint
//   } else {
//     fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
//   }
// 
//   //console.log('FU', fullUrl, fetch)
// 
//   return fetch(
//     fullUrl,
//     {credentials: 'include'}  // to include cookies in response (https://tonyspiro.com/how-to-keep-session-data-after-fetch-post-with-express/#comment-2544007117)
//   ).then(response => response.json().then(json => {
//     if (!response.ok) {
//       return Promise.reject(json)
//     }
// 
//     const nextPageUrl = getNextPageUrl(response)
// 
//     json = camelizeKeys(json)
//     if (schema) { json = normalize(json, schema) }
//     let r = Object.assign( {}, json, { nextPageUrl } )
// 
//     //console.log('FETCHED:', r) TODO: remove paginator
//     return r
//   })
//         )
// }



const callApi2 = (endpoint, fetchOptions) => {

  // TODO: fix
  let fullUrl
  if (endpoint.includes('http')) {
    fullUrl = endpoint
  } else {
    fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  }

  //console.log('FU', fullUrl, fetchOptions)

  return fetch(fullUrl, fetchOptions)
    .then(
      response => {

        // if (!response.ok)
        //   return response

        console.log('FE2:', response)


        return response.json()
          .then(json => {

            console.log('FETCHED2:', response)

            if (!response.ok) {
              return Promise.reject(json) // TODO: process also error status
            }

            //const nextPageUrl = getNextPageUrl(response)

            //json = camelizeKeys(json)
            //if (schema) { json = normalize(json, schema) }

            //?? let r = Object.assign( {}, json, /* { nextPageUrl }*/ )
            //return r

            return json
          })
          // .catch( error => {
          //   console.log('errr', error);
          //   return {'EE': 'error'}
          // })

      }
    )
    //.catch( error => console.error('TODO: callApi2 fetch error', error) )
}


// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// GitHub's API may return results with uppercase letters while the query
// doesn't contain any. For example, "someuser" could result in "SomeUser"
// leading to a frozen UI as it wouldn't find "someuser" in the entities.
// That's why we're forcing lower cases down there.

// const userSchema = new Schema('users', {
//   idAttribute: user => user.login.toLowerCase()
// })
// 
// const repoSchema = new Schema('repos', {
//   idAttribute: repo => repo.fullName.toLowerCase()
// })
// 
// repoSchema.define({
//   owner: userSchema
// })

// // Schemas for Github API responses.
// export const Schemas = {
//   USER: userSchema,
//   USER_ARRAY: arrayOf(userSchema),
//   REPO: repoSchema,
//   REPO_ARRAY: arrayOf(repoSchema)
// }

// Action key that carries API call info interpreted by this Redux middleware.
// export const CALL_API = Symbol('Call API')
export const CALL_API2 = Symbol('Call API2')

// // A Redux middleware that interprets actions with CALL_API info specified.
// // Performs the call and promises when such actions are dispatched.
// export const api = store => next => action => {
//   const callAPI = action[CALL_API]
//   if (typeof callAPI === 'undefined') {
//     return next(action)
//   }
// 
//   console.log('API1', action)
// 
//   let { endpoint } = callAPI
//   const { schema, types } = callAPI
// 
//   if (typeof endpoint === 'function') {
//     endpoint = endpoint(api.getState())
//   }
// 
//   if (typeof endpoint !== 'string') {
//     throw new Error('Specify a string endpoint URL.')
//   }
//   // if (!schema) {
//   //   throw new Error('Specify one of the exported Schemas.')
//   // }
//   if (!Array.isArray(types) || types.length !== 3) {
//     throw new Error('Expected an array of three action types.')
//   }
//   if (!types.every(type => typeof type === 'string')) {
//     throw new Error('Expected action types to be strings.')
//   }
// 
//   const actionWith = data => {
//     const finalAction = Object.assign({}, action, data)
//     delete finalAction[CALL_API]
//     return finalAction
//   }
// 
//   const [ requestType, successType, failureType ] = types
// 
//   next(actionWith({ type: requestType }))
// 
//   return callApi(endpoint, schema).then(
//     response => next(actionWith({
//       response,
//       type: successType
//     })),
//     error => next(actionWith({
//       type: failureType,
//       error: error.message || 'Something bad happened'
//     }))
//   )
// }

// CallAPI (my api)
// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export const api2 = store => next => action => {
  const callAPI2 = action[CALL_API2]
  if (typeof callAPI2 === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI2
  const { types, fetchOptions } = callAPI2

  if (typeof endpoint === 'function') {
    endpoint = endpoint(api2.getState())
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API2]
    //console.log('AW', action, data, finalAction)
    return finalAction
  }

  const [ requestType, successType, failureType ] = types

  next(actionWith({ type: requestType }))

  return callApi2(endpoint, fetchOptions)
    .then(

      response => next(actionWith({
        response,
        type: successType
      })),

      error => {
        return next(actionWith({
          type: failureType,
          error: error.message || 'Something bad happened'
        }))
      }

    )
    //.catch( error => ({'E2': error}) )
}
