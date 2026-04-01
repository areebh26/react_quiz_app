import React from 'react'

function ResultPageWhenTimeOver({userScore,totalScore}) {
  let percentage = totalScore > 0 ? Math.round((userScore / totalScore) * 100) : 0;
  return (
    <div className="result-container">
        <p className="result-time-over">⏰ Time is Over!</p>
        <p className="result-banner">😐 You scored {userScore} out of {totalScore} ({percentage}%)</p>
    </div>
  )
}

export default ResultPageWhenTimeOver