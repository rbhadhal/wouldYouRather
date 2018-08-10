import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollResult from './PollResult'
import { Redirect } from 'react-router-dom'

import { handleQuestionAnswerPoll  } from '../actions/polls'
import { handleQuestionAnswerUser } from '../actions/users'



class PollPage extends Component{

  state = {
    answer: 'optionOne',
  }
  handleChange = (e) => {

    this.setState({answer: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const answer = this.state.answer
    const {dispatch, id, authedUser} = this.props

    dispatch(handleQuestionAnswerPoll(authedUser, id, answer))
    dispatch(handleQuestionAnswerUser(authedUser, id, answer))
  }

  render(){
    const {poll, authedUser, id, users} = this.props
    if (poll === undefined){
      return  <Redirect to='/notFound'/>
    }
    const user = users[poll.author];
    const { optionOne, optionTwo} = poll

    if(authedUser === ''){
      return <Redirect to='/'/>
    }
    //test for answer already provided
    const answers = Object.keys(this.props.users[authedUser].answers)
    if(answers.includes(id))
    {
      return <PollResult id={id}/>
    }
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
  console.log(`the id params from the match is ${id}`)
  return{
    id,
    authedUser,
    poll: polls[id],
    users: users

  }
}

export default connect(mapStateToProps)(PollPage)
