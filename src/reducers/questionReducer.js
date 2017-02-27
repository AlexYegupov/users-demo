
const DEFAULT_QUESTIONS = {
  questions: [],
  questionsError: null,  // naive meaning "some error related with questions"
  createdQuestion: null, // just created question
}

export const questions = (state=DEFAULT_QUESTIONS, action) => {
    //console.log('usersReducer ACTION:', action)

    if (action.type === 'LOAD_QUESTIONS') {
      if (!action.error)
        return Object.assign({}, state, {
          questions: action.payload,
          createdQuestion: null,
          questionsError: null,
        })
      else
        return Object.assign({}, state, {
          questions: [],
          createdQuestion: null,
          questionsError: action.payload,
        })
    }

    if (action.type === 'CREATE_QUESTION') {

      if (!action.error)
        return Object.assign({}, state, {createdQuestion: action.payload, questionsError: null})
      else
        return Object.assign({}, state, {createdQuestion: null, questionsError: action.payload})
    }



    // if (action.type === 'LOAD_USER') {
    //   if (!action.error) {
    //     let user = action.payload
    //     user._timestamp = action.meta.timestamp
    //     return Object.assign({}, state, {user, userError: null})
    //   } else {
    //     return Object.assign({}, state, {user: null, userError: action.payload})
    //   }
    // }
    // 
    // if (action.type === 'PATCH_USER') {
    //   if (!action.error) {
    //     let user = action.payload
    //     //user._isPatched = true
    //     user._timestamp = action.meta.timestamp
    //     return Object.assign({}, state, {user, userError: null})
    //   } else {
    //     return Object.assign({}, state, {user: null, userError: action.payload})
    //   }
    // }
    // 
    // if (action.type === 'INIT_NEW_USER') {
    //   const emptyUser = {slug: '', login: '', name: '', _isNew: true,
    //                      _timestamp: new Date().toISOString()}
    //   return Object.assign({}, state, {user: emptyUser, userError: null})
    // }
    // 
    // if (action.type === 'CREATE_USER') {
    //   if (!action.error) {
    //     let user = action.payload
    //     user._isCreated = true
    //     user._timestamp = action.meta.timestamp
    //     return Object.assign({}, state, {user, userError: null})
    //   } else {
    //     return Object.assign({}, state, {user: null, userError: action.payload})
    //   }
    // }
    // 
    // if (action.type === 'DELETE_USER') {
    //   if (!action.error) {
    //     // delete deleted on server user from "users" array
    //     let newState = Object.assign({}, state)
    //     newState.users = state.users.filter(
    //       item => item.slug !== action.payload.deletedUserSlug)
    //     return newState
    //   } else {
    //     return Object.assign({}, state, {user: null, usersError: action.payload})
    //   }
    // }

    return state
  }


  
