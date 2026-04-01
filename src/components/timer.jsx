import React, { useEffect } from 'react'

function Timer({time,setTime}) {
    
    useEffect(()=>{
        if(time===0){return}
        let n = setInterval(() => {
            setTime((prev)=>(prev-1));
        }, 1000);
        return () => { clearInterval(n); }
    }, [time])
    function displayTime(){
        let timeInMin = String(Math.floor(time/60));
        if(timeInMin.length==1){
            timeInMin = "0"+timeInMin;
        }
        let remainingSec = String(time%60);
        if(remainingSec.length==1){
            remainingSec="0"+remainingSec;
        }
        return timeInMin + " : " + remainingSec;
    }
  return (
    <div className="timer">
        {displayTime()}
    </div>
  )
}

export default Timer  