import { RECEIVE_POLLS, ADD_POLL } from '../actions/polls'

export default function polls(state ={}, action){
  switch (action.type) {
    case RECEIVE_POLLS:
      return{
        ...state,
        ...action.polls
      }
    case ADD_POLL:
      const {poll} = action
      let userObj = {}
      //userObj = {[poll.author]: {...state[poll.author], questions: state[poll.author].questions.concat([poll.id])}}
      return{
        ...state, [action.poll.id]: action.poll, ...userObj,
      }
    default:
      return state

  }
}
