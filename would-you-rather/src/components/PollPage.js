import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionAnswerPoll  } from '../actions/polls'
import Poll from './poll'

class PollPage extends Component{

  state = {
    answer: '',
  }
  handleChange = (e) => {
    console.log(`in handle change and the answer is${e.target.value}`)
    this.setState({answer: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const answer = this.state.answer
    const {dispatch, id, authedUser} = this.props
    console.log(`in component the answer is: ${authedUser}`)
    dispatch(handleQuestionAnswerPoll(authedUser, id, answer))
  }

  render(){
    const {poll, user} = this.props
    const {author, optionOne, optionTwo} = poll
    return(
      <div className='poll'>

        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.name}`}
          className='avatar'
        />
        <div className='poll-info'>
          <h3>{`${user.name} asks would you rather:`}</h3>
          <br/>
          <form onSubmit={this.handleSubmit}>
            <label>
              Pick your answer
            <select value={this.state.answer} onChange={this.handleChange}>
              <option value='optionOne'>{optionOne.text}</option>
              <option value='optionTwo'>{optionTwo.text}</option>
            </select>
          </label>
          <input type='submit' value='Submit'/>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, polls, users}, props){
  const { id } = props.match.params
  console.log(`in mapstate and autheduser is ${authedUser}`)
  return{
    id,
    authedUser,
    poll: polls[id],
    user: users[polls[id].author],

  }
}

export default connect(mapStateToProps)(PollPage)
