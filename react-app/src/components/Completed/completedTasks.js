import { Modal } from '../../context/modal';
import { SetCompleted } from '../Tasks/setComplete'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { removeTask} from '../../store/events'
import '../Today/today.css'

export const CompletedTasks = ({task}) => {
    const dispatch = useDispatch()
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)


    const handleDeleteTask = async(e) => {
        e.preventDefault()
        dispatch(removeTask(task.id))
        setDeleteConfirmationModal(false)
    }

    return (
        <div className="task-list-container">
        <SetCompleted task={task}/>
        <div className="task-name-description">
            <li className="task name">{task?.name}</li>
            <li className="task description">{task?.description}</li>
            <li className="task due-date">Completed</li>
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
    )
}