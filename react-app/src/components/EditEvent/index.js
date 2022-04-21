import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from '../../context/modal';
import { useSelector, useDispatch } from 'react-redux'
import { editOneEvent, removeEvent } from '../../store/events'
import './editEvent.css'
// import { getAllEvents } from '../../store/events';


export const EditEvent = ({event}) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [editedEventName, setEditedEventName] = useState(event.name)
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
    const history = useHistory();
 
    const validate = () => {
        const validationErrors = []

        if(editedEventName === ""){
            validationErrors.push("Give your event a name!")
        }

        return validationErrors
    }

    const handleEditEvent = async(e) => {
        e.preventDefault()

        const errors = validate()

        if(errors.length > 0) return setErrors(errors)

            const editedEvent = {
                id: event.id,
                name: editedEventName,
                user_id: sessionUser.id
            }
            dispatch(editOneEvent(editedEvent))
            setShowModal(false)
            setErrors([])
            
    }
        

    const handleDeleteEvent = async(e) => {
        e.preventDefault()
        dispatch(removeEvent(event.id)).then(() => history.push(`/events/${event.id - 1}`))
        setShowModal(false)   
        setDeleteConfirmationModal(false)
    }

    return (
        <>
        <div className="event-link">
            <Link to={`/events/${event.id}`}>{event.name}</Link>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
        </div>
            
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <div className="edit-event-form-modal">
                        <h3>Edit event</h3>
                        <div className="edit-event-form">
                        <form>
                            <div id="errors">
                                {errors.map((error, ind) => (
                                    <div key={ind}>{error}</div>
                                ))}
                            </div>
                            <label>Name</label>
                            <input
                            type='text'
                            value={editedEventName}
                            onChange={e => setEditedEventName(e.target.value)}
                            />
                        </form>
                        <div className="edit-delete-buttons">
                            <button onClick={handleEditEvent} type="submit">Edit</button>
                            <button onClick={() => setDeleteConfirmationModal(true)} type="submit">Delete</button>
                        </div>
                        {deleteConfirmationModal && (
                        <Modal onClose={() =>setDeleteConfirmationModal(false)}>
                            <div className="delete-confirmation-modal">
                                Are you sure?
                                <div className="delete-confirmation-buttons">
                                    <button onClick={handleDeleteEvent}>Delete</button>
                                    <button onClick={() => setDeleteConfirmationModal(false)} >Cancel</button>
                                </div>
                            </div>
                        </Modal>
                    )}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
} 