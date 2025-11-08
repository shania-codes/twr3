import React from "react"

const HabitList = ({habits}) => {
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
                            <button>Update</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default HabitList