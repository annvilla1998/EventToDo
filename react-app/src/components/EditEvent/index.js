import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from '../../context/modal';
import { useDispatch, useSelector } from 'react-redux'
import { editOneEvent, removeEvent } from '../../store/events'


export const EditEvent = ({event, setIsLoaded}) => {
    const [showModal, setShowModal] = useState(false)
    const [editedEventName, setEditedEventName] = useState(event.name)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();



    const handleEditEvent = async(e) => {
        e.preventDefault()

        const editedEvent = {
            id: event.id,
            name: editedEventName,
            user_id: sessionUser.id
        }
        await dispatch(editOneEvent(editedEvent)).then(() => setIsLoaded(true))
        setShowModal(false)
    }


    const handleDeleteEvent = async(e) => {
        e.preventDefault()
        await dispatch(removeEvent(event.id))
        
    }

    return (
        <>
            <Link key={event.id} to={`/events/${event.id}`}>{event.name}</Link>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <div className="event-form-modal">
                        <div>
                        <form>
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