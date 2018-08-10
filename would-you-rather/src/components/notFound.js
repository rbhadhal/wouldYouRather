import React, {Component} from 'react';
import broken from '../broken.jpg'
import { connect } from 'react-redux'

class notFound extends Component{
  render(){
  return (
    <div>
      <div style={{backgroundImage: 'url(' + broken + ')'}}></div>
      <h3>
        What you are looking for could not found
      </h3>
      <h1>404</h1>
    </div>
  )
}
}

export default connect()(notFound);
