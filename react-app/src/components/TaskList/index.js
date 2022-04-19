import { useParams } from 'react-router-dom'
import { Tasks } from '../Tasks/index'
import '../Tasks/tasks.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createTask, getAllTasks } from '../../store/events'



export const TaskList = ({events}) => {
    const [dueDate, setDueDate] = useState(new Date());
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState('')
    const { id } = useParams()
    const parsedId = parseInt(id)
    // const tasks = Object.values(events[id]?.tasks)
    const tasksObj = useSelector(state => state.pageState.tasks)
    const tasks = Object.values(tasksObj)
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const today = Date.now();
    // console.log(today)

    useEffect(() => {
        dispatch(getAllTasks(parsedId));
    },[dispatch, parsedId])

    const addTask = async(e) => {
        e.preventDefault()
        
        if(taskName === ""){
            errors.push("Give your task a name!")
        }else if(Date.parse(dueDate) < today){
            errors.push("Please choose a date in the future.")
        }else{
            const newTask = {
            name: taskName,
            description: description,
            due_date: dueDate.toLocaleDateString(),
            event_id: parseInt(id),
            user_id: sessionUser.id
        }
            dispatch(createTask(newTask))
            setErrors([])
            const taskForm = document.querySelector(".new-task-form form")
            taskForm.style.display = "none"

        }
        
        
    }
        
        
    // task form expand
    const openForm = async(e) => {
        e.preventDefault()
        const taskForm = document.querySelector(".new-task-form form")
        const addTaskIcon = document.querySelector("#addTask i")
        const addTaskP = document.querySelector("#addTask p")
        taskForm.style.display = "block"
        addTaskIcon.style.display = 'none'
        addTaskP.style.display = 'none'
    }
    
    const cancelForm = async(e) => {
        e.preventDefault()
        const taskForm = document.querySelector(".new-task-form form")
        const addTaskIcon = document.querySelector("#addTask i")
        const addTaskP = document.querySelector("#addTask p")
        taskForm.style.display = "none"
        addTaskIcon.style.display = 'block'
        addTaskP.style.display = 'block'
    }
console.log(errors, taskName)
    return (
        <>
            <div className="tasks-container">
                <h2>Tasks</h2>
                    {tasks?.map(task => (
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
                        <div id="errors">
                            {errors.map((error, ind) => (
                                <div key={ind}>{error}</div>
                            ))}
                        </div>
                        <input
                        type="text"
                        placeholder="Task Name"
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