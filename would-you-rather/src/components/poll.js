import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Poll extends Component{
  state = {
    redirect: false,
  }
  viewPoll = (e, poll) => {
    e.preventDefault()
      this.setState({
        redirect: true
      })
    }

  render(){
    const {poll, user} = this.props
    if (poll === null){
      return <p>This question does not exist</p>
    }
    if (this.state.redirect === true)
    {
      return <Redirect to={`/questions/${this.props.id}`}/>

    }

    const {optionOne, optionTwo} = poll
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
  return {
    authedUser,
    user: users[polls[id].author],
    poll: polls[id]
  }
}

export default connect(mapStateToProps)(Poll)
