import {useState} from "react"

const HabitForm = ({existingHabit = {}, updateCallback}) => {
    const [name, setName] = useState(existingHabit.name || "");
    const [description, setDescription] = useState(existingHabit.description || "");

    const updating = Object.entries(existingHabit).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            description,
        }
        const url = "/api/" + (updating ? `update_habit/${existingHabit.id}` : "new_habit")
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const message = await response.json()
            alert(message.message)
        } else {
            updateCallback()
        }
    }

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}  className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"></input>   
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"></input>   
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 hover:opacity-90 transition">{updating ? "Update Habit" : "Create Habit"}</button>
    </form>

}
export default HabitForm