import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from '../../context/modal';
import { useSelector } from 'react-redux'
import { editOneEvent, removeEvent } from '../../store/events'
import './editEvent.css'


export const EditEvent = ({event, dispatch, setIsLoaded}) => {
    const [showModal, setShowModal] = useState(false)
    const [editedEventName, setEditedEventName] = useState(event.name)
    const sessionUser = useSelector(state => state.session.user);
    // const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);



    const handleEditEvent = async(e) => {
        e.preventDefault()

        const editedEvent = {
            id: event.id,
            name: editedEventName,
            user_id: sessionUser.id
        }
        const data = await dispatch(editOneEvent(editedEvent))
        if (data) {
            setErrors(data)
        }else {
            setShowModal(false)
        }
    }


    const handleDeleteEvent = async(e) => {
        e.preventDefault()
        await dispatch(removeEvent(event.id)).then(() => setIsLoaded(true))
        setShowModal(false)
        
    }

    return (
        <>
            <Link key={event.id} to={`/events/${event.id}`}>{event.name}</Link>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <div className="edit-event-form-modal">
                        <h2>Edit event</h2>
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
                        <button onClick={handleEditEvent} type="submit">Edit</button>
                        <button onClick={handleDeleteEvent} type="submit">Delete</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
} 