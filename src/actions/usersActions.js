//import { CALL_API2 } from '../middleware/api2'
import { CALL_API3 } from '../middleware/api3'


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







export const loadUsers3 = () => (dispatch, getState) => {

  return dispatch({
    [CALL_API3]: {
      //types: [ USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE ],
      type: 'USERS_REQUEST3',

      endpoint: 'http://localhost:3001/api/users', //`repos/${fullName}`,
      //TODO: remove full url everywhere

      //schema: Schemas.REPO  //??
    }
  })

}



