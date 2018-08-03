import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../_DATA'

class Poll extends Component{

  viewPoll = (e, poll) =>
    e.preventDefault()
  // TODO: redirect to submit page
  render(){
    const {poll, user} = this.props

    if (poll === null){
      return <p>This question does not exist</p>
    }

    const {
      author, optionOne, optionTwo} = poll




    console.log(this.props)
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
          <span>{optionOne.text} or {optionTwo.text}</span>
          <button className='view-poll' onClick={(e) => this.viewPoll(e, poll)}>
            View Question
          </button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({users, authedUser, polls}, {id}){
  const poll = polls[id]
  const user = users[poll.author]

  return {
    authedUser,
    user: user,
    poll: poll
  }
}

export default connect(mapStateToProps)(Poll)