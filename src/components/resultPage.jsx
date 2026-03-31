import React from 'react'

function ResultPage({userScore,totalScore}) {
  return (
    <div>
        <p>You scored {userScore} out of {totalScore}</p>
    </div>
  )
}

export default ResultPage