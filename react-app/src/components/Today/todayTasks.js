import { SetCompleted } from '../Tasks/setComplete'
import { removeTask} from '../../store/events'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../context/modal';
import '../Tasks/tasks.css'

export const TodayTasks = ({task}) => {
    // const date = new Date(task.due_date)
    // const dueDate = date.getDate()
    // const dueMonth = date.getMonth()
    // const dueYear = date.getFullYear()
    // const parsedDueDate = `${dueMonth}/${dueDate}/${dueYear}`
    const dispatch = useDispatch()
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
    

    const handleDeleteTask = async(e) => {
        e.preventDefault()
        dispatch(removeTask(task.id))
        setDeleteConfirmationModal(false)
    }

    return  (
        <>
            <div className="task-list-container" key={task.id}>
                <SetCompleted task={task}/>
                <div className="task-name-description">
                    <li className="task name">{task?.name}</li>
                    <li className="task description">{task?.description}</li>
                    <li className="task due-date">Scheduled for today</li>
                </div>
                <i id='edit-delete-task' onClick={() => setDeleteConfirmationModal(true)} className="fa-solid fa-trash-can"></i>
                    {deleteConfirmationModal && (
                        <Modal onClose={() =>setDeleteConfirmationModal(false)}>
                            <div className="delete-confirmation-modal">
                                Are you sure?
                                <div className="delete-confirmation-buttons">
                                    <button className="btn" onClick={handleDeleteTask}>Delete</button>
                                    <button className="btn" onClick={() => setDeleteConfirmationModal(false)} >Cancel</button>
                                </div>
                            </div>
                        </Modal>
                    )}
            </div>
        </>
    )
}