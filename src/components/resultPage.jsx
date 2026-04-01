import React from 'react'

function ResultPage({userScore,totalScore}) {
  let percentage = totalScore > 0 ? Math.round((userScore / totalScore) * 100) : 0;
  return (
    <div className="result-container">
        <p className="result-banner">😐 You scored {userScore} out of {totalScore} ({percentage}%)</p>
    </div>
  )
}

export default ResultPage