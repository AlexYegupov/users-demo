import { CALL_API2 } from '../middleware/api2'

export const LOGIN_REQUEST = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const fetchLogin = (login, pwd) => ({
  [CALL_API2]: {
    types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
    endpoint: `http://localhost:3001/api/session`,
    fetchOptions: {
      method: 'POST',
      body: new URLSearchParams(`login=${login}&pwd=${pwd}`),
      credentials: 'include'  // to include cookies in fresponse CR
    }
  }
})

export const login = (login, pwd) => (dispatch, getState) =>
  dispatch(fetchLogin(login, pwd))



export const logout = () => (dispatch, getState) => {
  return dispatch({type: 'LOGOUT'})
}


export const getUserInfo = (slug) => (dispatch, getState) => {
  return dispatch({type: 'GET_USER_INFO', slug: slug})
}
