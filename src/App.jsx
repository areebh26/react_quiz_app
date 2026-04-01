import { useEffect, useState } from "react";
import Question from "./components/question";
import ResultPage from "./components/resultPage";
import ResultPageWhenTimeOver from "./components/resultPageWhenTimeOver";

function App() {
  let [questions,setQuestions] = useState([]);
  let [isCompleted,setIsCompleted] = useState(false);
  let [open,setOpen]=useState(false);
  let [scores,setScores]=useState({
    userScore:0,
    totalScore:0
  });
  let [time,setTime] = useState(120);
  useEffect(()=>{
    async function getData(){
      let res = await fetch("http://localhost:9000/questions");
      let data = await res.json();
      setQuestions(data);
    };
    getData();
  }, []);
  

  
  
  return (
    <div className="app">
      <header className="app-header">
        <img src="/favicon.svg" alt="React Logo" className="app-logo" />
        <h1 className="app-title">The React Quiz</h1>
      </header>
      {!open && !isCompleted && time!==0 && (
        <div className="welcome-text">
          <h2>Welcome to The React Quiz!</h2>
          <h3>15 questions to test your React mastery</h3>
        </div>
      )}
      {!open && (<button className="btn-start" onClick={()=>(setOpen(true))}>Let's start!</button>)}
      {time==0 ? (<ResultPageWhenTimeOver userScore={scores.userScore} totalScore={scores.totalScore}></ResultPageWhenTimeOver>) : open && (isCompleted ? (<ResultPage userScore={scores.userScore} totalScore={scores.totalScore}></ResultPage>) : questions.length==0 ? <p className="loading-text">Loading Questions</p> : (<Question questions={questions} setCompleted={setIsCompleted} setScores={setScores} time={time} setTime={setTime}></Question>))}
    </div>
  )
}

export default App
