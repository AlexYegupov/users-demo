import settings from '../settings'

export const login = (login, pwd) => async (dispatch, getState) => {
  await dispatch({
    type: 'LOGIN',
    meta: {
      apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/session`,
      fetchOptions: {
        method: 'POST',
        body: new URLSearchParams(`login=${encodeURIComponent(login)}&pwd=${encodeURIComponent(pwd)}`),
        credentials: 'include'  // to include cookies in fresponse CR
      }
    }
  })

  //saveUserToLocalStorage(getState().auth.loggedUser)
}


export const logout = () => async (dispatch, getState) => {
  await dispatch({
    type: 'LOGOUT'
  })

  //let state = getState()
  //saveUserToLocalStorage(state.auth.loggedUser)
}

//? export const refreshLoggedUser = () => (dispatch, getState) => {
// NOTE: ~~ return only structure (is that OK?) because used both
// in middleware AND react component
export const refreshLoggedUser = () => {
  return {
    type: 'REFRESH_LOGGED_USER',
    meta: {
      apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/session`,
      fetchOptions: {
        method: 'GET',
        credentials: 'include'  // to include cookies in fresponse CR
      }
    }
  }

  // let result = dispatch({
  //   type: 'TEST'
  // })
  // 
  // console.log('kk1', result, getState())
  // 
  // let r2 = dispatch( {type: 'TEST', param: 22} )
  // 
  // console.log('kk2', r2, getState())

}

export const getUserInfo = (slug) => (dispatch, getState) => {
  return dispatch({type: 'GET_USER_INFO', slug: slug})
}



export const test = () => (dispatch, getState) => {
  let result = dispatch({
    type: 'TEST'
  })

  console.log('kk1', result, getState())

  let r2 = dispatch( {type: 'TEST', param: 22} )

  console.log('kk2', r2, getState())
}


