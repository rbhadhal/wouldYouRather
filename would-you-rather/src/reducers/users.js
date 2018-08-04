import { RECEIVE_USERS, QUESTION_ANSWER_USER } from '../actions/users'


export default function users(state ={}, action){
  switch (action.type) {
    case RECEIVE_USERS:

      return{
        ...state,
        ...action.users
      }
    case QUESTION_ANSWER_USER:
      const {authedUser, qid, answer} = action
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
    default:
      return state

  }
}
