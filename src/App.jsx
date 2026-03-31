import { useEffect, useState } from "react";
import Question from "./components/question";
import ResultPage from "./components/resultPage";

function App() {
  let [questions,setQuestions] = useState([]);
  let [isCompleted,setIsCompleted] = useState(false);
  let [open,setOpen]=useState(false);
  let [scores,setScores]=useState({
    userScore:0,
    totalScore:0
  });
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
      {open && (isCompleted ? (<ResultPage userScore={scores.userScore} totalScore={scores.totalScore}></ResultPage>) : (<Question questions={questions} setCompleted={setIsCompleted} setScores={setScores}></Question>))}
      

      
      
      
    </div>
  )
}

export default App
