import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    fetch("/api/time")
    .then(res => res.json()) // res contains json response from flask
    .then(data => {
      setCurrentTime(data.time);
    }) 
  }, []); // if any variables in [] change it will rerun this to update but since it's empty this will only run once

  return (
    <>
      <h1>Habit Grid</h1>
      <p>Time at load: {new Date(currentTime * 1000).toLocaleString()}</p>
      <br></br>

      <dashboard className="grid grid-cold-3 gap-4">
        <featurebutton className=""> 
          <img src="./public/habits.png"></img>Habits
        </featurebutton>
        <featurebutton> 
          <img src="./instance/"></img>Stats
        </featurebutton>
        <featurebutton> 
          <img src="./instance/"></img>Settings
        </featurebutton>
      </dashboard>

    </>
  )
}

export default App
