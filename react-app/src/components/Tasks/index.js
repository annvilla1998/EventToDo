import './tasks.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { editOneTask, removeTask } from '../../store/events'
import { Modal } from '../../context/modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import DateObject from "react-date-object";


export const Tasks = ({task}) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [editedTaskName, setEditedTaskName] = useState(task.name)
    const [editedDescription, setEditedDescription] = useState(task.description)
    const [editedDueDate, setEditedDueDate] = useState(new Date(task.due_date))
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const handleEditTask = async(e) => {
        e.preventDefault()
        if(editedTaskName !== ""){
            const editedTask= {
                id: task.id,
                name: editedTaskName,
                user_id: sessionUser.id
            }
            await dispatch(editOneTask(editedTask))
            setShowModal(false)
            setErrors([])
        }else{
            errors.push("Give your task a name!")
        }
    }

    const handleDeleteTask = async(e) => {
        e.preventDefault()
        await dispatch(removeTask(task.id))
    }

    const cancelForm = async(e) => {
        e.preventDefault()
        setShowModal(false)
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
                        <button onClick={() => setShowModal(true)}>Edit</button>
                        {showModal && (
                            <Modal onClose={() =>setShowModal(false)}>
                                <div className="edit-task-form">
                                    <h2>Edit Task</h2>
                                    <form>
                                        <div id="errors">
                                            {errors.map((error, ind) => (
                                                <div key={ind}>{error}</div>
                                            ))}
                                        </div>
                                        <input
                                        type="text"
                                        placeholder="Task Name"
                                        value={editedTaskName}
                                        onChange={e => setEditedTaskName(e.target.value)}
                                        />
                                        <textarea
                                        type="text"
                                        placeholder="Description"
                                        value={editedDescription}
                                        onChange={e=> setEditedDescription(e.target.value)}
                                        />
                                        <DatePicker 
                                        selected={editedDueDate} 
                                        onChange={(date) => setEditedDueDate(date)} 
                                        />
                                        <button onClick={handleEditTask}>Edit Task</button>
                                        <button onClick={cancelForm}>Cancel</button>
                                    </form> 
                                </div>
                            </Modal>
                        )}
                    <button onCLick={handleDeleteTask}>Delete</button>
                </div>
                    
            </div>
        </div>
    )
}