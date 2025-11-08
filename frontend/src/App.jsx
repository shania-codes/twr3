import { useState, useEffect } from 'react'
import HabitList from "./HabitList"
import HabitForm from "./HabitForm"


function App(props) {
  const [currentTime, setCurrentTime] = useState(0);
  //const [activeSection, setActiveSection] = useState("dashboard");
  const [habits, setHabits] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchHabits = async () => {
    const response = await fetch("/api/get_all_habits")
    const data = await response.json()
    setHabits(data.habits)
  }

  const fetchTime = async () => {
    const time = await fetch("/api/time").then(res => res.json()).then(data => {setCurrentTime(data.time);})
  }

  useEffect(() => {
    fetchTime()
    fetchHabits()
  }, []); // if any variables in [] change it will rerun this to update but since it's empty this will only run once

  return (
    <>
      <h1>Welcom to Habit Grid {props.user}</h1>
      <p>Time at load: {new Date(currentTime * 1000).toLocaleString()}</p>
      <br></br>

      <HabitList habits={habits} />
      <HabitForm />

      {/* TWR Dashboard for all "apps" */}
      {/* <dashboard>
        <featurebutton className=""> 
          <img src="./public/habits.png"></img>Habits
        </featurebutton>
        <featurebutton> 
          <img src="./public/charts.jpg"></img>Stats
        </featurebutton>
        <featurebutton> 
          <img src="./public/settings.png"></img>Settings
        </featurebutton>
      </dashboard> */}

    </>
  )
}

export default App
