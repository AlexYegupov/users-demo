
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

    return state
  }


  
