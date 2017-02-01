import settings from '../settings'
import { localStoragePresent, localStorageObject } from '../utils/localStorageUtil'

// const f1 = () => async () => {
//   let v = Promise.resolve(11)
//   return v
// }
// 
// f1()().then( r => console.log('lr a AW', r) )


export function saveUserToLocalStorage(user) {
  if (localStoragePresent) {
    localStorageObject.set('loggedUser', user)
  }
}

export const login = (login, pwd) => async (dispatch, getState) => {
  //console.log('LR1', getState())

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

  saveUserToLocalStorage(getState().auth.loggedUser)

  // dispatch({
  //   type: 'LOGIN',
  //   meta: {
  //     apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/session`,
  //     fetchOptions: {
  //       method: 'POST',
  //       body: new URLSearchParams(`login=${encodeURIComponent(login)}&pwd=${encodeURIComponent(pwd)}`),
  //       credentials: 'include'  // to include cookies in fresponse CR
  //     }
  //   }
  // }).then( r => {
  //   console.log('LR2', r, getState(), getState().auth.loggedUser)
  //   if (localStoragePresent) {
  //     let state = getState()
  //     localStorageObject.set('loggedUser', state.auth.loggedUser)
  //   }
  // })

// .then( response => {
//     console.log('LOGIN RESP', response)
//   }).then( response => {
//     return dispatch({
//       type: 'TEST'
//     })
//   })

}


export const logout = () => async (dispatch, getState) => {
  await dispatch({
    type: 'LOGOUT'
  })

  let state = getState()
  saveUserToLocalStorage(state.auth.loggedUser)
}

//? export const refreshLoggedUser = () => (dispatch, getState) => {
// NOTE: ~~ return only structure (is that OK?) because used both
// in middleware AND react component
export const refreshLoggedUserAction = () => {
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



// // TODO: this place?
// export const tryRestoreLoggedUser = (store) => {
//   console.log('11', store)
//   return
//   if (!localStoragePresent) return
// 
//   //let localStorageLoggedUser = localStorageObject.get('loggedUser')
// 
//   // if (localStorageLoggedUser) {
//   // 
//   // }
// 
// 
// 
//   store.dispatch(
//     {action: 'TEST', param: 'p1'}
//   ).then( result => store.dispatch( {action: 'TEST', param: 'p2'} ) )
// 
// }
// 
// 
// tryRestoreLoggedUser()  // ?? here
