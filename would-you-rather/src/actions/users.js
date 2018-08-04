import { showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const QUESTION_ANSWER_USER = 'QUESTION_ANSWER_USER'

export function receiveUsers(users){
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function questionAnswer(authedUser, qid, answer){
  return{
    type: QUESTION_ANSWER_USER,
    qid,
    answer,
    authedUser,
  }
}

export function handleQuestionAnswerUser(authedUser, qid, answer){
  return(dispatch, getState) =>{
    dispatch(showLoading())
    dispatch(questionAnswer(authedUser,qid, answer))
    dispatch(hideLoading())
  }
}
