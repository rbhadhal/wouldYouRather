import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser} from '../actions/authedUser'

class Nav extends Component{

  handleLogout = (e) => {
    e.preventDefault()
    console.log(`in handlelogout of nav bar`)
    this.props.dispatch(setAuthedUser(''))
  }


  render()
  {
  return (
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Poll
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          {this.props.authedUser === '' ? ('Please log on' ): (<div><b>User: {this.props.authedUser} is logged in </b><button className='logout' onClick={this.handleLogout}> LOGOUT </button></div>)}
        </li>
      </ul>
  )

}
}
function mapStateToProps({authedUser}){
  return{
    authedUser,
  }
}

export default connect(mapStateToProps)(Nav)
