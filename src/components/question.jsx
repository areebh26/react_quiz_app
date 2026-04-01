import React, {  useEffect, useReducer, useState } from "react";
import Timer from "./timer";

function Question({ questions,setCompleted,setScores,time,setTime }) {
  let totalPoints = 0;
  questions.forEach((element) => {
    totalPoints += element.points;
  });
 
  let [resultBox, setResultBox] = useState(false);
  useEffect(()=>{
    setScores((prev)=>(
            {
              ...prev,
              totalScore:totalPoints
            }
          ))
  });
  function handleClick(e) {
    let answer = questions[state.index].correctOption;
    let userSelection = e.target.value;
    
    
    let userSelectionNumber;
    for (let x = 0; x < state.options.length; x++) {
      if (userSelection === state.options[x]) {
        userSelectionNumber = x;
      }
    }
    if (userSelectionNumber === answer) {
      dispatch({ type: "update" });
      setResultBox(true);
      setScores((prev)=>(
        {
          ...prev,
          userScore:state.points + questions[state.index].points
        }
      ));
    } else {
      setResultBox(true);
    }
  }
  function reducer(state, action) {
    switch (action.type) {
      case "next":
        
        return {
          ...state,
          questionNumber: state.questionNumber + 1,
          question: questions[state.index + 1].question,
          options: questions[state.index + 1].options,
          answer: questions[state.index + 1].correctOption,
          index: state.index + 1,
        };

      case "update":
        return {
          ...state,
          points: state.points + questions[state.index].points,
        };
    }
  }
  let initialState = {
    index: 0,
    questionNumber: 1,
    points: 0,
    question: questions[0].question,
    options: questions[0].options,
    answer: questions[0].correctOption,
  };
  
  let [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="question-container">
      <div className="progress-section">
        <progress className="progress-bar" value={state.questionNumber} max={questions.length}></progress>
      </div>
      <div className="question-info">
        <span>Question {state.questionNumber}/{questions.length}</span>
        <span>{state.points}/{totalPoints} points</span>
      </div>
      <h3 className="question-text">{state.question}</h3>
      <div className="options-list">
        {resultBox
          ? state.options.map((option, index) => {
             
            return  <div key={index} className={`answer-option ${index === state.answer ? "answer-correct" : "answer-wrong"}`}>
                <span>{option}</span> <span>{index === state.answer ? "✅" : "❌"}</span>
              </div>;
            })
          : state.options.map((option, index) => (
              
              <button key={index} value={option} onClick={handleClick} className="option-btn">
                {option}
              </button>
            ))}
      </div>
      <div className="question-footer">
        <Timer time={time} setTime={setTime}></Timer>
        {resultBox && state.index!==questions.length - 1 && (
          <button
            className="btn-next"
            onClick={() => {
              dispatch({ type: "next" });
              setResultBox(false);
              
            }}
          >
            Next
          </button>
        )}
      </div>
      {resultBox && state.index==questions.length - 1 && (<div className="quiz-completed">
        <p>Quiz Completed !</p>
        <button className="btn-result" onClick={()=>{
          setCompleted(true)
        }}>Show Result</button>
      </div>)}

    </div>
  );
}

export default Question;
