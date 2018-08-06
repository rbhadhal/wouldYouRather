import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component{


render(){
  const users = this.props.users
  const usersIds = Object.keys(users)
  console.log(`in the render of leader board first user is ${usersIds}`)
  console.log(`user answers ${Object.keys(users['johndoe'].answers).length}`)
  console.log(`users questions ${users['johndoe'].questions.length}`)
  let tempArray = []
  let t = []
  tempArray = usersIds.map((id) => {
    console.log(`in map function id is ${id}`)
    t.push({
      id: users[id].id,
      name: users[id].name,
      avatar: users[id].avatarURL,
      answered: Object.keys(users[id].answers).length,
      questions: users[id].questions.length,
      total: Object.keys(users[id].answers).length + users[id].questions.length,})

}
)
console.log(`t is ${Object.keys(t)}`)

console.log(`new array is ${tempArray['johndoe']}`)
const sortedArray = Object.keys(t).sort((a,b) => t[b].total - t[a].total) // this funcitons sorts the ids in the keys by sort function ie. total values
console.log(`sorted array ${sortedArray}`)

console.log(`sorted array first total is ${sortedArray[0]} and the last item is ${sortedArray[4]}`)
return(
    sortedArray.map((s) => (
    <div className='poll'>
      <img
        src={t[s].avatar}
        alt={`Avatar of ${t[s].name}`}
        className='avatar'
      />
      <div className='poll-info'>
        <h3>{`${t[s].name} has a total score of: ${t[s].total}`}</h3>
        <br/>
        <span>Has asked {t[s].questions} and answered: {t[s].answered}</span>

      </div>

    </div>
  )

)
)
}
}

function mapStateToProps({users}){
  //console.log(`in map state Leaderboard and authed user is ${authedUser} and user is ${Object.keys(users[authedUser].answers)}`)
  return{
    users: users,
  }
}
export default connect(mapStateToProps)(Leaderboard)
