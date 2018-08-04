import { RECEIVE_POLLS, ADD_POLL, QUESTION_ANSWER } from '../actions/polls'

export default function polls(state ={}, action){
  switch (action.type) {
    case RECEIVE_POLLS:
      return{
        ...state,
        ...action.polls
      }
    case ADD_POLL:
      //userObj = {[poll.author]: {...state[poll.author], questions: state[poll.author].questions.concat([poll.id])}}
      return{
        ...state, [action.poll.id]: action.poll,
      }
    case QUESTION_ANSWER:
      const {authedUser, qid, answer} = action
      console.log(`in reducer trying to add authedUser ${authedUser} qid is ${qid} and answer is ${answer}`)
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    default:
      return state

  }
}
