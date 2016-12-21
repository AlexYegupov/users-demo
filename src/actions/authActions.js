//import { CALL_API2 } from '../middleware/api2'

export const LOGIN_REQUEST = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// w
// const fetchLogin = (login, pwd) => ({
//   [CALL_API2]: {
//     types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
//     endpoint: `http://localhost:3001/api/session`,
//     fetchOptions: {
//       method: 'POST',
//       body: new URLSearchParams(`login=${login}&pwd=${pwd}`),
//       credentials: 'include'  // to include cookies in fresponse CR
//     }
//   }
// })
// 
// export const login = (login, pwd) => (dispatch, getState) =>
//   dispatch(fetchLogin(login, pwd))
// 
// export const logout = () => (dispatch, getState) =>
//   dispatch({type: 'LOGOUT'})


// TODO: unhardcode url5
export const login = (login, pwd) => (dispatch, getState) =>
  dispatch({
    type: 'LOGIN',
    meta: {
      apiCall: 'http://localhost:3001/api/session', //TODO: "apiCall" -> "url"
      fetchOptions: {
        method: 'POST',
        body: new URLSearchParams(`login=${encodeURIComponent(login)}&pwd=${encodeURIComponent(pwd)}`),
        credentials: 'include'  // to include cookies in fresponse CR
      }  //TODO -> "options"
    }
  })

export const logout = () => (dispatch, getState) =>
  dispatch({
    type: 'LOGOUT'
  })


export const getUserInfo = (slug) => (dispatch, getState) => {
  return dispatch({type: 'GET_USER_INFO', slug: slug})
}



  // return dispatch({
  //   type: 'LOAD_USERS',
  //   meta: {apiCall: 'http://localhost:3001/api/users'}
  // 
  //   // meta: {apiCall: 'USERS_LIST',
  //   //        endpoint: 'http://localhost:3001/api/users'}
  // })
