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
    const tasksObj = useSelector(state => state.pageState.tasks)
    const tasks = Object.values(tasksObj)
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const today = Date.now();
    const event = useSelector(state => state.pageState.events[id])

    const validate = () => {
        const validationErrors = []

        if(!taskName){
            validationErrors.push("Give your task a name!")
        }
        
        if(Date.parse(dueDate) <= today){
            validationErrors.push("Please choose a date in the future.")
        }
        
        return validationErrors
    }


    useEffect(() => {
        dispatch(getAllTasks(parsedId));
    },[dispatch, parsedId])

    const addTask = async(e) => {
        e.preventDefault()
        
        const errors = validate()

        if(errors.length > 0) return setErrors(errors)

        const newTask = {
        name: taskName,
        description: description,
        due_date: dueDate.toLocaleDateString(),
        event_id: parseInt(id),
        user_id: sessionUser.id
        }
        dispatch(createTask(newTask))
        setErrors([])
        setTaskName('')
        setDescription('')
        const taskForm = document.querySelector(".new-task-form form")
        const addTaskIcon = document.querySelector("#addTask i")
        const addTaskP = document.querySelector("#addTask p")
        taskForm.style.display = "none"
        addTaskIcon.style.display = 'block'
        addTaskP.style.display = 'block'
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


    return (
        <>
            <div className="tasks-container">
                <h3>To do before: {event?.name}</h3>
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
                        <button className="btn" onClick={addTask}>Add Task</button>
                        <button className="btn" onClick={cancelForm}>Cancel</button>
                    </form> 
                </div>
            </div>
        </>
    )
}