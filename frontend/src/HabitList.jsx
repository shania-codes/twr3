import React from "react"


const HabitList = ({habits, updateHabit, updateCallback}) => {
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

    return <div>
        <h2>Habits</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {habits.map((habit) => (
                    <tr key={habit.id}>
                        <td>{habit.name}</td>
                        <td>{habit.description}</td>
                        <td>
                            <button onClick={() => updateHabit(habit)}>Update</button>
                            <button onClick={() => onDelete(habit.id)} >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default HabitList