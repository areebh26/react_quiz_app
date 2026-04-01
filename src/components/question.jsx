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
    <div>
      <progress></progress>
      <p>
        Question {state.questionNumber}/{questions.length}
      </p>
      <p>
        {state.points}/{totalPoints} Points
      </p>
      <h3>{state.question}</h3>
      {resultBox
        ? state.options.map((option, index) => {
             
           return  <div key={index}>
              {option} {index === state.answer ? "✅" : "❌"}
            </div>;
          })
        : state.options.map((option, index) => (
            
            <button key={index} value={option} onClick={handleClick}>
              {option}
            </button>
          ))}
      {resultBox && state.index!==questions.length - 1 && (
        <button
          onClick={() => {
            dispatch({ type: "next" });
            setResultBox(false);
            
          }}
        >
          Next
        </button>
      )}
      <Timer time={time} setTime={setTime}></Timer>
      {resultBox && state.index==questions.length - 1 && (<div>
        <p>Quiz Completed !</p>
        <button onClick={()=>{
          setCompleted(true)
        }}>Show Result</button>
      </div>)}

    </div>
  );
}

export default Question;
