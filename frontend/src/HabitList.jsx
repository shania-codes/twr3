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
      <h2 className="font-bold mb-4">Habits</h2>
      <table className="table-auto border-collapse border border-gray-800">
        <thead className="bg-gray-400">
          <tr>
            <th className="border border-gray-800">Habit</th>
            {days.map((d) => (
              <th key={d} className="border border-gray-800">{d.slice(5)}</th>
            ))}
            <th className="px-2 py-1 border border-gray-800">Description</th>
            <th className="px-2 py-1 border border-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((h) => (
            <tr key={h.id}>
              <td className="px-3 border border-gray-800">{h.name}</td>
              {days.map((d) => {
                const completed = logs[h.id]?.[d] || false;
                return (
                  <td
                    className="px-3 border border-gray-800"
                    key={d}
                    style={{
                      cursor: "pointer",
                      backgroundColor: completed ? "#4bff5aff" : "lightgray",
                      textAlign: "center",
                      width: "40px",
                    }}
                    onClick={() => toggleComplete(h.id, d, completed)}
                  >
                    {completed ? "✅" : ""}
                  </td>
                );
              })}
              <td className="px-3 border border-gray-800">{h.description}</td>
              <td className="px-3 border border-gray-800">
                <button onClick={() => updateHabit(h)}className="px-1 border border-gray-800 bg-gray-400">Edit</button>
                <button onClick={() => onDelete(h.id)}className="px-1 border border-gray-800 bg-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HabitList