import { useParams } from 'react-router-dom'
import { Tasks } from '../Tasks/index'
import '../Tasks/tasks.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react'
// import { useSelector } from 'react-'


export const TaskList = ({events}) => {
    const [dueDate, setDueDate] = useState(new Date());
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState('')
    const { id } = useParams()
    const tasks = events[id]?.tasks
    // const sessionUser = useSelector(state => state.session.user);


    const addTask = async(e) => {
    //     e.preventDefault()
        
    //     newTask = {
    //         name: taskName,
    //         description: description,
    //         due_date: dueDate,
    //         event_id: id,
    //         user_id: sessionUser.id
        }


    // }

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
        <>
            <div className="tasks-container">
                <h2>Tasks</h2>
                    {tasks.map(task => (
                        <div key={task?.id}>
                            <Tasks task={task} />
                        </div>
                    ))}
                <div onClick={openForm} id="addTask">
                    <i className="fa-solid fa-plus"></i>
                    <p>Add Task</p>
                </div>
                <div className="new-task-form">
                    <form style={{display:'none'}}>
                        <input
                        type="text"
                        placeholder="Task Name"
                        required={true}
                        value={taskName}
                        onChange={e => setTaskName(e.target.value)}
                        />
                        <textarea
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
        </>
    )
}