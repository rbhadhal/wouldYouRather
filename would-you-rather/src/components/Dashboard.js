import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './poll'
import { setAuthedUser } from '../actions/authedUser'

class Dashboard extends Component {



  state = {
    display: 'unanswered',
  }

  handleChange = (e) => {
    const v = e.target.value
    this.setState(() => ({
      display: v,
    }))
  }


  handleUserChange = (e) => {(e)
    const dispatch = this.props.dispatch
    dispatch(setAuthedUser(e.target.value))
  }

  render(){

    if(!this.props.authedUser || this.props.authedUser === ''){
      console.log('i am in my new if statement')
      return(
        <form>
            {console.log(`in form area`)}
          <label>
            Please login first:
          <select value={this.props.authedUser} onChange={this.handleUserChange} onSubmit= {this.handleUserChange}>
            <option value='' disabled/>
            <option value='tylermcginnis'>tylermcginnis</option>
            <option value='johndoe'>johndoe</option>
            <option value='sarahedo'>sarahedo</option>
          </select>
        </label>
        </form>
      )
    }

    let answered = []
    let unanswered = []
    let polls = []
    let sortedAnswer = []


     polls = this.props.polls
     answered = Object.keys(this.props.users[this.props.authedUser].answers)
     sortedAnswer = Object.keys(answered).sort((a,b) => polls[answered[b]].timestamp - polls[answered[a]].timestamp)
     unanswered = this.props.pollIds.filter(f => !answered.includes(f))

    return(
      <div>
          {console.log(`show be showing some data`)}
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
          )) : sortedAnswer.map((id) => (
            <li key={id}>
              <Poll id={answered[id]}/>
            </li>))
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps({polls, authedUser, users}, props){
  //console.log(`in map state dashboard and authed user is ${authedUser} and user is ${Object.keys(users[authedUser].answers)}`)
  return{

    pollIds: Object.keys(polls)
      .sort((a,b) => polls[b].timestamp - polls[a].timestamp),
    users: users,
    authedUser,
    polls,
  }
}
export default connect(mapStateToProps)(Dashboard)
