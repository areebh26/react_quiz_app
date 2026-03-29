import React, { useReducer } from 'react'

function Question({questions}) {
    if (!questions || questions.length === 0) return null;
    function handleClick(e){
        let answer = questions[state.index].correctOptions;
        let userSelection = e.target.value;
        let userSelectionNumber ;
        for(let x = 0 ; x < state.options.length ; x++){
            if(userSelection===state.options[x]){
                userSelectionNumber=x;
            }
        }
        if(userSelectionNumber===answer){
            dispatch({type:"answerTrue"})
        }else{
            dispatch({type:"answerFalse"})
        }



    }
    function reducer(state,action){
        switch(action.type){
            case "update" : return {
                ...state,
                 questionNumber:state.questionNumber+1,
                 points:state.points+5,
                 question:questions[state.index+1].question,
                 options:questions[state.index+1].options,
                 index:state.index+1
            }

            case "answerTrue" : return {
                ...state,
                isCorrect : true
            }

            case "answerFalse" : return {
                ...state,
                isWrong : true
            }
        }
    }
    let initialState={
        index:0,
        questionNumber : 1,
        points : 0,
        question : questions[0].question,
        options : questions[0].options,
        isCorrect : false,
        isWrong : false
        
        
    };
    let totalPoints = 0 ; 
    questions.forEach(element => {
        totalPoints+= element.points;
    });
    let [state,dispatch]=useReducer(reducer , initialState);
  return (
    <div>
        <progress></progress>
        <p>Question {state.questionNumber}/{questions.length}</p>
        <p>{state.points}/{totalPoints} Points</p>
        <h3>{state.question}</h3>
        {state.options.map((option,index)=>(<button key={index} onClick={}>{option}</button>))}
        {state.isCorrect && (<p>Your answer is Correct</p>)}
        {state.isWrong && (<p>Your answer is wrong</p>)}
        <button onClick={()=>(dispatch({type:"update"}))} >Next</button>

    </div>
  )
}

export default Question