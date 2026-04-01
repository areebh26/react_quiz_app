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
    <div>
      <h1>The React Quiz</h1>
      <h2>Welcome to react Quiz !</h2>
      <h3>15 Questions to test your react mastery</h3>
      {!open && (<button onClick={()=>(setOpen(true))}>Lets Start</button>)}
      {time==0 ? (<ResultPageWhenTimeOver userScore={scores.userScore} totalScore={scores.totalScore}></ResultPageWhenTimeOver>) : open && (isCompleted ? (<ResultPage userScore={scores.userScore} totalScore={scores.totalScore}></ResultPage>) : questions.length==0 ? <p>Loading Questions</p> : (<Question questions={questions} setCompleted={setIsCompleted} setScores={setScores} time={time} setTime={setTime}></Question>))}
      

      
      
      
    </div>
  )
}

export default App
