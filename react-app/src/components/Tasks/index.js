import './tasks.css'
import { useState } from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const Tasks = ({task}) => {
    const [dueDate, setDueDate] = useState(new Date());
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState('')
    
    // style={{display:'none'}}
    const addTask = async(e) => {
        e.preventDefault()


    }


    return (
        <div className="task-list">
                <div className="task-container" key={task.id}>
                    <input className="task-checkbox" type="checkbox" />
                    <div className="task-name-description">
                        <li className="task name">{task?.name}</li>
                        <li className="task description">{task?.description}</li>
                    </div>
                </div>
                <i className="fa-solid fa-plus"></i>
                <div className="new-task-form">
                    <form >
                        <input
                        type="text"
                        placeholder="Task Name"
                        required={true}
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                        />
                        <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={e=> setDescription(e.target.value)}
                        />
                        <DatePicker 
                        selected={dueDate} 
                        onChange={(date) => setDueDate(date)} 
                        />
                        <button onClick={addTask}>Add Task</button>
                    </form>
                </div>

        </div>
    )
}