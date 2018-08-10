import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class PollResult extends Component{

    render(){
    const {poll, user} = this.props

    if (poll === null){
      return  <Redirect to='/notFound'/>
    }

    const {optionOne, optionTwo} = poll
    const optionOneCount = optionOne.votes.length
    const optionTwoCount = optionTwo.votes.length
    const totalCount = optionOneCount + optionTwoCount
    const optionOnePercent = optionOneCount / totalCount * 100
    const optionTwoPercent = optionTwoCount / totalCount * 100

    return(
      <div className='poll'>
        <img
          src={user.avatarURL}
          alt={`Avatar of ${user.name}`}
          className='avatar'
        />
        <div className='poll-info'>
          <h3>{`${user.name} asked would you rather:`}</h3>
          <br/>
          <span>{optionOneCount} voted for Option One: {optionOne.text} which was {optionOnePercent}%</span>
          <br/>
          <span>{optionTwoCount} voted for Option Two: {optionTwo.text} which was {optionTwoPercent}%</span>
          <br/>
          <span>You {this.props.authedUser} voted for {this.props.authAnswer}</span>
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
    poll: poll,
    authAnswer: users[authedUser].answers[id]
  }
}

export default connect(mapStateToProps)(PollResult)
