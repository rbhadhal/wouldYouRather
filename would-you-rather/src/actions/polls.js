import { _saveQuestion, _saveQuestionAnswer } from '../_DATA.js'
import { showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const ADD_POLL = 'ADD_POLL'
export const QUESTION_ANSWER= 'QUESTION_ANSWER'

export function addPoll(poll){
  return{
    type: ADD_POLL,
    poll,
  }
}

export function questionAnswer(authedUser, qid, answer){
  return{
    type: QUESTION_ANSWER,
    qid,
    answer,
    authedUser,
  }
}

export function handleAddPoll(optionOneText, optionTwoText){
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())

    return _saveQuestion({
      author: authedUser,
      optionOneText: optionOneText,
      optionTwoText: optionTwoText
    })
    .then((poll) => dispatch(addPoll(poll)))
    .then(() => dispatch(hideLoading()))
  }
}
export function handleQuestionAnswerPoll(authedUser, qid, answer){
  return(dispatch, getState) =>{
    dispatch(showLoading())
    return _saveQuestionAnswer({authedUser,qid, answer})
    .then(() => dispatch(questionAnswer(authedUser,qid, answer)))
    .then(() => dispatch(hideLoading()))
  }
}

export function receivePolls(polls){
  return {
    type: RECEIVE_POLLS,
    polls,
  }
}
