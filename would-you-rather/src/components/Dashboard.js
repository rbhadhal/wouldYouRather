import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './poll'
import { setAuthedUser } from '../actions/authedUser'

class Dashboard extends Component {
  state = {
    display: 'unanswered',
    loggedIn: '',
  }

  handleChange = (e) => {
    const v = e.target.value
    this.setState(() => ({
      display: v,

    }))
  }
  handleUserChange = (e) => {
    const u = e.target.value
    const dispatch = this.props.dispatch
    dispatch(setAuthedUser(u))
    this.setState(() => ({
      loggedIn: u,
    }))
  }
// TODO: sort the answered array by timestamp
  render(){

    const allPolls = this.props.pollIds
    const answered = this.props.answered
    const unanswered = allPolls.filter(f => !answered.includes(f))


    return(
      !this.state.loggedIn ? (
        <form>
          <label>
            Please login first:
          <select value={this.state.loggedIn} onChange={this.handleUserChange}>
            <option value='tylermcginnis'>tylermcginnis</option>
            <option value='johndoe'>johndoe</option>
            <option value='sarahedo'>sarahedo</option>
          </select>
        </label>
        </form>

      ) :
      <div>
        <h3 className='center'> Your Questions </h3>
        <form >
          <label>
            View:
          <select value={this.state.display} onChange={this.handleChange}>
            <option value='unanswered'>Unanswered</option>
            <option value='answered'>Answered</option>
          </select>
        </label>
        </form>



        <ul className='dashboard-list'>
          {this.state.display === 'unanswered' ?
          unanswered.map((id) => (
            <li key={id}>

              <Poll id={id}/>
            </li>
          )) : answered.map((id) => (
            <li key={id}>

              <Poll id={id}/>
            </li>))
          }
        </ul>

      </div>
    )

  }
}

function mapStateToProps({polls, authedUser, users}, props){
  console.log(`in map state dashboard and authed user is ${authedUser} and user is ${Object.keys(users[authedUser].answers)}`)
  return{

    pollIds: Object.keys(polls)
      .sort((a,b) => polls[b].timestamp - polls[a].timestamp),
    answered: Object.keys(users[authedUser].answers)
  }
}
export default connect(mapStateToProps)(Dashboard)
