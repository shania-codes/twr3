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
      <table className="table-auto border-collapse border border-gray-800 w-full table-fixed">
        <thead className="bg-gray-400">
          <tr>
            <th className="border border-gray-800 th-nowrap w-12">Habit</th>
            {days.map((d) => (
              <th key={d} className="border border-gray-800 th-nowrap w-12">{d.slice(5)}</th>
            ))}
            <th className="border border-gray-800 th-nowrap w-26">Description</th>
            <th className="py-0.5 border border-gray-800 th-nowrap w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((h) => (
            <tr key={h.id}>
              <td className="px-3 border border-gray-800 th-nowrap w-12">{h.name}</td>
              {days.map((d) => {
                const completed = logs[h.id]?.[d] || false;
                return (
                  <td
                    className="px-3 hovergrEy th-nowrap w-12"
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
              <td className="px-3 border border-gray-800 th-nowrap w-12">{h.description}</td>
              <td className="px-3 border border-gray-800 th-nowrap w-12">
                <button onClick={() => updateHabit(h)}className="px-3 py-1 border border-gray-800 bg-blue-500 text-white rounded hover:bg-blue-600 hover:opacity-90 transition">Edit</button>
                <button onClick={() => onDelete(h.id)}className="px-3 py-1 border border-gray-800 bg-red-500 text-white rounded hover:bg-red-600 hover:opacity-90 transition">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HabitList