import { urlize } from '../utils/serialize'
import settings from '../settings'


export const loadQuestions = () => (dispatch, getState) => {
  return dispatch({
    type: 'LOAD_QUESTIONS',
    meta: {apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/questions`}
  })

}



export const loadQuestion = (id) => (dispatch, getState) => {
  return dispatch({
    type: 'LOAD_QUESTION',
    meta: {
      apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/questions/${id}`,
      fetchOptions: {
        method: 'GET',
        //body: new URLSearchParams(`login=${login}&pwd=${pwd}`),
        //credentials: 'include'  // to include cookies in fresponse CR
      }
    }
  })
}


export const createQuestion = (data) => (dispatch, getState) => {
  return dispatch({
    type: 'CREATE_QUESTION',
    meta: {
      apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/questions`,
      fetchOptions: {
        method: 'POST',
        body: new URLSearchParams(urlize(data)), //`login=${login}&pwd=${pwd}`
        credentials: 'include'  // to include cookies in response     (https://tonyspiro.com/how-to-keep-session-data-after-fetch-post-with-express/#comment-2544007117)

      }
    }
  })  
}

// export const deleteUser = (slug) => (dispatch, getState) => {
//   return dispatch({
//     type: 'DELETE_USER',
//     meta: {
//       apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/users/${slug}`,
//       fetchOptions: {
//         method: 'DELETE',
//         //body: new URLSearchParams(urlize(user)), //`login=${login}&pwd=${pwd}`
//         credentials: 'include'  // to include cookies in response     (https://tonyspiro.com/how-to-keep-session-data-after-fetch-post-with-express/#comment-2544007117)
// 
//       }
//     }
//   })  
// }
