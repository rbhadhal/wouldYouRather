import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component{

total = (users, id) => Object.keys(users[id].answers).length + users[id].questions.length

render(){
  const users = this.props.users
  const sortedUsers = Object.keys(users).sort((a,b) => (this.total(users,b)) - (this.total(users,a)))
  if(this.props.authedUser === ''){
  return <Redirect to='/'/>
  }
  return(
    sortedUsers.map((u) => (
    <div className='poll'>
      <img
        src={users[u].avatarURL}
        alt={`Avatar of ${users[u].name}`}
        className='avatar'
      />
      <div className='poll-info'>
        <h3>{`${users[u].name} has a total score of: ${this.total(users,u)}`}</h3>
        <br/>
        <span>Has asked {users[u].questions.length} and answered: {Object.keys(users[u].answers).length}</span>
      </div>
    </div>
    )
  )
)
}
}

function mapStateToProps({users, authedUser}){
  return{
    users: users,
    authedUser,
  }
}
export default connect(mapStateToProps)(Leaderboard)
