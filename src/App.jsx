import { useEffect, useState } from "react";
import Question from "./components/question";

function App() {
  let [questions,setQuestions] = useState([]);
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
      <button>Lets Start</button>
      
      <Question questions={questions}></Question>
    </div>
  )
}

export default App
