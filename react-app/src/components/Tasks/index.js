import './tasks.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { editOneTask, removeTask } from '../../store/events'
import { Modal } from '../../context/modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const Tasks = ({task}) => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [editedTaskName, setEditedTaskName] = useState(task.name)
    const [editedTaskDescription, setEditedTaskDescription] = useState(task.description)
    const [editedDueDate, setEditedDueDate] = useState(new Date(task.due_date))
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false)
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
    // const [checked, setChecked] = useState(false)
    const today = Date.now();

    const validate = () => {
        const validationErrors = []

        if(!editedTaskName){
            validationErrors.push("Give your task a name!")
        }
        if(Date.parse(editedDueDate) <= today){
            validationErrors.push("Please choose a date in the future.")
        }

        return validationErrors
    }

    // const handleCompletedTask = () => {
    //     const checkbox = document.querySelector(".task-checkbox")
        
    // }

    const handleEditTask = async(e) => {
        e.preventDefault()

        const errors = validate()

        if(errors.length > 0) return setErrors(errors)

            const editedTask= {
                id: task.id,
                name: editedTaskName,
                description: editedTaskDescription,
                user_id: sessionUser.id,
                event_id: task.event_id
            }
           dispatch(editOneTask(editedTask))
            setShowModal(false)
            setErrors([])
    }

    const handleDeleteTask = async(e) => {
        e.preventDefault()
        dispatch(removeTask(task.id))
        setDeleteConfirmationModal(false)
    }

    const cancelForm = async(e) => {
        e.preventDefault()
        setShowModal(false)
    }
// console.log(checked)
// onChange={handleCompletedTask}
    return (
        <div className="task-list">
            <div className="task-container">
                <div className="task-list-container" key={task.id}>
                    <input className="task-checkbox" 
                    type="checkbox" 
                    />
                    <div className="task-name-description">
                        <li className="task name">{task?.name}</li>
                        <li className="task description">{task?.description}</li>
                        <li className="task due-date">Scheduled For: {task?.due_date}</li>
                    </div>
                        <i id='edit-delete-task' onClick={() => setShowModal(true)} className="fa-solid fa-pen-to-square"></i>
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
                                        value={editedTaskDescription}
                                        onChange={e=> setEditedTaskDescription(e.target.value)}
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
                    <i id='edit-delete-task' onClick={() => setDeleteConfirmationModal(true)} className="fa-solid fa-trash-can"></i>
                    {deleteConfirmationModal && (
                        <Modal onClose={() =>setDeleteConfirmationModal(false)}>
                            <div className="delete-confirmation-modal">
                                Are you sure?
                                <div className="delete-confirmation-buttons">
                                    <button onClick={handleDeleteTask}>Delete</button>
                                    <button onClick={() => setDeleteConfirmationModal(false)} >Cancel</button>
                                </div>
                            </div>
                        </Modal>
                    )}
                </div>
                    
            </div>
        </div>
    )
}