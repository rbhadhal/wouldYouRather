import { _saveQuestion, _saveQuestionAnswer } from '../_DATA.js'
import { showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const ADD_POLL = 'ADD_POLL'
export const QUESTION_ANSWER= 'QUESTION_ANSWER'
export const ADD_POLL_USER = 'ADD_POLL_USER'

export function addPoll(poll){
  console.log(`in action and the poll id is ${poll.id}`)
  return{
    type: ADD_POLL,
    poll,
  }
}

export function addPollUser(action){
  console.log(`in action add poll user and the poll id is ${action.poll.id} and poll author is ${action.poll.author}`)
  return{
    type: ADD_POLL_USER,
    qid: action.poll.id,
    authedUser: action.poll.author,
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
    .then((poll) => dispatch(addPoll(poll))) // this guy returned the action object of above
    .then((action) => dispatch(addPollUser(action)))
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
