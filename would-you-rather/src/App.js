import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData} from './actions/shared'
import Dashboard from './components/Dashboard'
import LoadingBar from 'react-redux-loading'
import NewPoll from './components/NewPoll'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        <LoadingBar/>
        {this.props.loading === true
          ? null
          :<Dashboard/>
          //:<NewPoll/>
        }
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return{
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
