import React, { Component } from 'react'
import { handleAddPoll  } from '../actions/polls'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class NewPoll extends Component{

  state = {
    questionOne: '',
    questionTwo: '',
    home: false,
  }

  handleChange = (e) => {(e)
    const answerOne = e.target.name
    const v = e.target.value

    this.setState(() => ({
      [answerOne]: v
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {questionOne, questionTwo} = this.state
    const {dispatch, id} = this.props
    dispatch(handleAddPoll(questionOne, questionTwo, id))
    this.setState(() => ({
      home: true,
    }))
  }

  render(){
    const {questionOne, questionTwo} = this.state

    const { home } = this.state
    if (home === true){
      return <Redirect to='/'/>
    }
    if (this.props.authedUser === '')
    {
      return <Redirect to='/'/>
    }
    return(


    <div>

      <h3 className='center'>
        Would you rather: please enter two questions
      </h3>
      <form className='new-poll' onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label>
          Question One:
          <input
            name='questionOne'
            type='text' />
        </label>
        <br/>
        <label>
          Question Two:
          <input
            name='questionTwo'
            type='text'
            onChange={this.handleQuestionTwo}
          />
        </label>
        <input type='submit' value='submit' disabled={questionOne === '' || questionTwo === ''}/>
      </form>

    </div>


  )
  }
}

function mapStateToProps ({authedUser}, props){
  return{
    authedUser,

  }
}
// mapStateToProps
export default connect(mapStateToProps)(NewPoll)
