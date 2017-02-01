import { urlize } from '../utils/serialize'
import settings from '../settings'


export const loadUsers = () => (dispatch, getState) => {
  return dispatch({
    type: 'LOAD_USERS',
    meta: {apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/users`},
    zz: 1
  })

}


export const loadUser = (slug) => (dispatch, getState) => {
  console.log('action LU', slug)
  return dispatch({
    type: 'LOAD_USER',
    meta: {
      apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/users/${slug}`,
      fetchOptions: {
        method: 'GET',
        //body: new URLSearchParams(`login=${login}&pwd=${pwd}`),
        //credentials: 'include'  // to include cookies in fresponse CR
      }
    }
  })
}

export const patchUser = (user) => (dispatch, getState) => {
  //console.log('UUU', user, urlize(user))
  return dispatch({
    type: 'PATCH_USER',
    meta: {
      apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/users/${user.slug}`,
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
      apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/users`,
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
      apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/users/${slug}`,
      fetchOptions: {
        method: 'DELETE',
        //body: new URLSearchParams(urlize(user)), //`login=${login}&pwd=${pwd}`
        credentials: 'include'  // to include cookies in response     (https://tonyspiro.com/how-to-keep-session-data-after-fetch-post-with-express/#comment-2544007117)

      }
    }
  })  
}
