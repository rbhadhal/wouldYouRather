import { RECEIVE_USERS, QUESTION_ANSWER_USER } from '../actions/users'
import { ADD_POLL_USER } from '../actions/polls'


export default function users(state ={}, action){
  switch (action.type) {
    case RECEIVE_USERS:

      return{
        ...state,
        ...action.users
      }
    case QUESTION_ANSWER_USER:
      let {authedUser, qid, answer} = action
      console.log(`in user reducer adn auth user is ${authedUser} the qid is ${qid} and the answer is ${answer}`)
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case ADD_POLL_USER:
      authedUser = action.authedUser
      qid = action.qid
      console.log(`in user reducer adn auth user is ${authedUser} the qid is ${qid} `)
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([qid])
        }
      }
    default:
      return state

  }
}
