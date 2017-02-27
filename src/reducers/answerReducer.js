
const DEFAULT_ANSWERS = {
  question: null, // "current question" (for answer form)
  answers: [],    // all "current question" answers
  answersError: null,  // "some error related with answers"
  createdAnswer: null, // just created question
}

export const answers = (state=DEFAULT_ANSWERS, action) => {
    //console.log('usersReducer ACTION:', action)


    if (action.type === 'LOAD_QUESTION') {
      if (!action.error)
        return Object.assign({}, state, {
          question: action.payload,
          answers: [],
          answersError: null,
          createdAnswer: null,
        })
      else
        return Object.assign({}, state, {
          question: null,
          answers: [],
          answersError: action.payload,
          createdAnswer: null,
        })
    }


    if (action.type === 'LOAD_ANSWERS') {
      if (!action.error)
        return Object.assign({}, state, {
          answers: action.payload,
          answersError: null,
          createdAnswer: null,
        })
      else
        return Object.assign({}, state, {
          answers: [],
          answersError: action.payload,
          createdAnswer: null,
        })
    }

    if (action.type === 'CREATE_ANSWER') {
      if (!action.error)
        return Object.assign({}, state, {
          createdAnswer: action.payload,
          answersError: null
        })
      else
        return Object.assign({}, state, {
          createdAnswer: null,
          answersError: action.payload
        })
    }

    return state
  }


  
