import React, { Component } from 'react'
import { handleAddPoll  } from '../actions/polls'
import { connect } from 'react-redux'

class NewPoll extends Component{

  state = {
    questionOne: '',
    questionTwo: '',
  }

  handleChange = (e) => {
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
    console.log(`quesiton one: ${questionOne} quesiton two: ${questionTwo}`)
    dispatch(handleAddPoll(questionOne, questionTwo, id))


  }
  render(){
    const {questionOne, questionTwo} = this.state
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

export default connect()(NewPoll)
