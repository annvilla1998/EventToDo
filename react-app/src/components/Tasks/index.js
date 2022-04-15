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


    //     const addTaskIcon = document.getElementById("addTask")
    //     const taskForm = document.querySelector(".new-task-form form")
    //     addTaskIcon.addEventListener("click", (e) => {
        //         e.preventDefault()
    //         taskForm.style.display = "block"
    //     })
    //     // console.log(addTaskIcon)
    //     //task form hide
    
    //     const cancelTaskFormButton = document.querySelector(".cancel-task") 
    //     cancelTaskFormButton.addEventListener("click", (e) => {
        //         e.preventDefault()
        //         taskForm.style.display = "none"
        //     })
        
        
    // task form expand
    const openForm = async(e) => {
        e.preventDefault()
        const taskForm = document.querySelector(".new-task-form form")
        taskForm.style.display = "block"
    }
    
    const cancelForm = async(e) => {
        e.preventDefault()
        const taskForm = document.querySelector(".new-task-form form")
        taskForm.style.display = "none"
    }

    return (
        <div className="task-list">
            <div className="task-container">
                <div className="task-list-container" key={task.id}>
                    <input className="task-checkbox" type="checkbox" />
                    <div className="task-name-description">
                        <li className="task name">{task?.name}</li>
                        <li className="task description">{task?.description}</li>
                        <li className="task due-date">{task?.due_date}</li>
                    </div>
                </div>
                    <i onClick={openForm} id="addTask" className="fa-solid fa-plus"></i>
                    <div className="new-task-form">
                        <form style={{display:'none'}}>
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
                            <button onClick={cancelForm}>Cancel</button>
                        </form>
                        
                    </div>
            </div>
        </div>
    )
}