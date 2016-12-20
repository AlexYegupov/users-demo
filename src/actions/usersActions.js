//import { CALL_API2 } from '../middleware/api2'
//import { CALL_API3 } from '../middleware/api3'


// export const USERS_REQUEST = 'USERS_REQUEST'
// export const USERS_SUCCESS = 'USERS_SUCCESS'
// export const USERS_FAILURE = 'USERS_FAILURE'
// 
// const fetchUsers = () => ({
//   [CALL_API2]: {
//     types: [ USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE ],
// 
//     endpoint: 'http://localhost:3001/api/users', //`repos/${fullName}`,
//     //TODO: remove full url everywhere
// 
//     //schema: Schemas.REPO  //??
//   }
// })
// 
// export const loadUsers = () => (dispatch, getState) => {
//   return dispatch(fetchUsers())
// }


import { urlize } from '../utils/serialize'






export const loadUsers3 = () => (dispatch, getState) => {
  return dispatch({
    type: 'LOAD_USERS',
    meta: {apiCall: 'http://localhost:3001/api/users'}

    // meta: {apiCall: 'USERS_LIST',
    //        endpoint: 'http://localhost:3001/api/users'}
  })

  // not sure such implementation details should be present in action
  // return dispatch({
  //   type: CALL_API3,
  //   meta: {apiCall: 'USERS_LIST',
  //          endpoint: 'http://localhost:3001/api/users'
  //         },
  // })

  // return dispatch({
  //   [CALL_API3]: {
  //     //types: [ USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE ],
  //     type: 'USERS_REQUEST3',
  // 
  //     endpoint: 'http://localhost:3001/api/users', //`repos/${fullName}`,
  //     //fetchOptions: {...}
  //   }
  // })

}


export const loadUser = (slug) => (dispatch, getState) => {
  //console.log('lU', slug)
  return dispatch({
    type: 'LOAD_USER',
    meta: {
      apiCall: `http://localhost:3001/api/users/${slug}`, 
      fetchOptions: {
        method: 'GET',
        //body: new URLSearchParams(`login=${login}&pwd=${pwd}`),
        //credentials: 'include'  // to include cookies in fresponse CR
      }
    }
  })
}

// w
// export const createNewUser = () => (dispatch, getState) => {
//   //console.log('cNU')
//   return dispatch({
//     type: 'INIT_NEW_USER',
//   })
// }

export const patchUser = (user) => (dispatch, getState) => {
  //console.log('UUU', user, urlize(user))
  return dispatch({
    type: 'PATCH_USER',
    meta: {
      apiCall: `http://localhost:3001/api/users/${user.slug}`, 
      fetchOptions: {
        method: 'PATCH',
        body: new URLSearchParams(urlize(user)), //`login=${login}&pwd=${pwd}`
        credentials: 'include'  // to include cookies in response     (https://tonyspiro.com/how-to-keep-session-data-after-fetch-post-with-express/#comment-2544007117)

      }
    }
  })  
}


export const createUser = (user) => (dispatch, getState) => {
  //console.log('UUU', user, urlize(user))
  return dispatch({
    type: 'CREATE_USER',
    meta: {
      apiCall: `http://localhost:3001/api/users`,
      fetchOptions: {
        method: 'POST',
        body: new URLSearchParams(urlize(user)), //`login=${login}&pwd=${pwd}`
        credentials: 'include'  // to include cookies in response     (https://tonyspiro.com/how-to-keep-session-data-after-fetch-post-with-express/#comment-2544007117)

      }
    }
  })  
}

export const deleteUser = (slug) => (dispatch, getState) => {
  return dispatch({
    type: 'DELETE_USER',
    meta: {
      apiCall: `http://localhost:3001/api/users/${slug}`,
      fetchOptions: {
        method: 'DELETE',
        //body: new URLSearchParams(urlize(user)), //`login=${login}&pwd=${pwd}`
        credentials: 'include'  // to include cookies in response     (https://tonyspiro.com/how-to-keep-session-data-after-fetch-post-with-express/#comment-2544007117)

      }
    }
  })  
}
