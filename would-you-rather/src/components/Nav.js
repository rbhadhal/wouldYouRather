import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component{
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
          <NavLink to='/new' activeClassName='active'>
            New Poll
          </NavLink>
        </li>
        <li>
          {this.props.authedUser} is logged on
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
