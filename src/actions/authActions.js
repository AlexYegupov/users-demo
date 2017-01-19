export const login = (login, pwd) => (dispatch, getState) =>
  dispatch({
    type: 'LOGIN',
    meta: {
      apiCall: 'http://localhost:3001/api/session',
      fetchOptions: {
        method: 'POST',
        body: new URLSearchParams(`login=${encodeURIComponent(login)}&pwd=${encodeURIComponent(pwd)}`),
        credentials: 'include'  // to include cookies in fresponse CR
      }
    }
  })

export const logout = () => (dispatch, getState) =>
  dispatch({
    type: 'LOGOUT'
  })


export const getUserInfo = (slug) => (dispatch, getState) => {
  return dispatch({type: 'GET_USER_INFO', slug: slug})
}


