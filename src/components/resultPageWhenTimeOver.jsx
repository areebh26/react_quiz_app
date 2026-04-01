import React from 'react'

function ResultPageWhenTimeOver({userScore,totalScore}) {
  return (
    <div>
        <p>Time is Over !</p>
        <p>you scored {userScore} out of {totalScore}</p>
    </div>
  )
}

export default ResultPageWhenTimeOver