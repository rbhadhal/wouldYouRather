import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../_DATA'

class PollResult extends Component{

    const {poll, user} = this.props

    if (poll === null){
      return <p>This question does not exist</p>
    }

    const {author, optionOne, optionTwo} = poll
    const optionOneCount = optionOne.votes.length
    const optionTwoCount = optionTwo.votes.length
    const totalCount = optionOneCount + optionTwoCount
    const optionOnePercent = optionOneCount / totalCount
    const optionTwoPercent = optionTwoCount / totalCount

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
