import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [currentTime, setCurrentTime] = useState(0);

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
      <p>Current time: {new Date(currentTime * 1000).toLocaleString()}</p>
    </>
  )
}

export default App
