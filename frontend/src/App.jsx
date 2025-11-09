import { useState, useEffect } from 'react'
import HabitList from "./HabitList"
import HabitForm from "./HabitForm"


function App(props) {
  const [currentTime, setCurrentTime] = useState(0);
  //const [activeSection, setActiveSection] = useState("dashboard");
  const [habits, setHabits] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentHabit, setCurrentHabit] = useState({})
  

  useEffect(() => {
    fetchTime()
    fetchHabits()
  }, []);


  const fetchHabits = async () => {
    const response = await fetch("/api/get_all_habits")
    const data = await response.json()
    setHabits(data.habits)
  }

  const fetchTime = async () => {
    const time = await fetch("/api/time").then(res => res.json()).then(data => {setCurrentTime(data.time);})
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentHabit({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (habit) => {
    if (isModalOpen) return
    setCurrentHabit(habit)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchHabits()
  }

  return (
    <>
      <h1 className="font-bold">Welcome to Habit Grid {props.user}</h1>
      {/*<p>Time at load: {new Date(currentTime * 1000).toLocaleString()}</p>*/}

      <HabitList habits={habits} updateHabit={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal} className="px-4 py-2 bg-green-500 text-white rounded font-bold hover:bg-green-600 hover:opacity-90 transition">Create New Habit</button>

      { isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <HabitForm existingHabit={currentHabit} updateCallback={onUpdate} />
        </div>
      </div>
      }


    </>
  )
}

export default App
