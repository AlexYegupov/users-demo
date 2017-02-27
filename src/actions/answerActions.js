import { urlize } from '../utils/serialize'
import settings from '../settings'


export const loadAnswers = (questionId) => (dispatch, getState) => {
  console.log('LA', questionId)
  return dispatch({
    type: 'LOAD_ANSWERS',
    meta: {apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/questions/${questionId}/answers`}
  })

}


//
export const loadQuestionAndAnswers = (id) => async (dispatch, getState) => {

   await dispatch({
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

  return dispatch(loadAnswers(id))
}



export const createAnswer = (data) => (dispatch, getState) => {
  return dispatch({
    type: 'CREATE_ANSWER',
    meta: {
      apiCall: `http://${settings.apiHost}:${settings.apiPort}/api/questions/${data.questionId}/answers`,
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
