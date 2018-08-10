import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData} from './actions/shared'
import { connect } from 'react-redux'
import Dashboard from './components/Dashboard'
import LoadingBar from 'react-redux-loading'
import NewPoll from './components/NewPoll'
import PollPage from './components/PollPage'
import PollResult from './components/PollResult'
import Leaderboard from './components/Leaderboard'
import Nav from './components/Nav'
import notFound from './components/notFound'


class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
          <Fragment>
            <LoadingBar />
            <div className='container'>
              <Nav className='nav'/>
              {this.props.loading === true
                ? null
                : <div>
                  <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/questions/:id' component={PollPage} />
                    <Route path='/add' component={NewPoll} />
                    <Route path='/leaderboard' component={Leaderboard}/>
                    <Route path='/notFound' component={notFound}/>
                  </Switch>
                  </div>}
            </div>
          </Fragment>
        </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return{
    loading: authedUser === null
  }
}


export default connect(mapStateToProps)(App)
