import React, { useEffect, useState } from "react"


const HabitList = ({habits, updateHabit, updateCallback}) => {
    const [logs, setLogs] = useState({});

    const fetchLogs = async () => {
        const res = await fetch("/api/get_habit_logs")
        const data = await res.json()
        setLogs(data.logs || {})
    }

    useEffect(() => {
        fetchLogs();
    }, [habits]); // re-runs when habits change

    const days = [...Array(7)].map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        return d.toISOString().split("T")[0]
    })

    const toggleComplete = async (habitID, dateStr, current) => {
        await fetch ("/api/complete_habit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                habitID,
                date: dateStr,
                completed: !current
            })
        })
        fetchLogs();
    }

    const onDelete = async (id) => {
        try {
            const options = {
                method: "POST"
            }
            const response = await fetch(`/api/delete_habit/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
    <div>
      <h2>Habits</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Habit</th>
            {days.map((d) => (
              <th key={d}>{d.slice(5)}</th>
            ))}
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((h) => (
            <tr key={h.id}>
              <td>{h.name}</td>
              {days.map((d) => {
                const completed = logs[h.id]?.[d] || false;
                return (
                  <td
                    key={d}
                    style={{
                      cursor: "pointer",
                      backgroundColor: completed ? "lightgreen" : "lightgray",
                      textAlign: "center",
                      width: "40px",
                    }}
                    onClick={() => toggleComplete(h.id, d, completed)}
                  >
                    {completed ? "✓" : ""}
                  </td>
                );
              })}
              <td>{h.description}</td>
              <td>
                <button onClick={() => updateHabit(h)}>Edit</button>
                <button onClick={() => onDelete(h.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HabitList