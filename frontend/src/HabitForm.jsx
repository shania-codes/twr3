import {useState} from "react"

const HabitForm = ({}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            description,
        }
        const url = "/api/new_habit"
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
            // Successful
        }
    }

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}></input>   
        </div>
        <div>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></input>   
        </div>
        <button type="submit">Create Habit</button>
    </form>

}
export default HabitForm