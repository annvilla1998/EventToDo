import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from '../../context/modal';
import { useSelector, useDispatch } from 'react-redux'
import { editOneEvent, removeEvent } from '../../store/events'
import './editEvent.css'
import { getAllEvents } from '../../store/events';
import { Tasks } from '../Tasks';


export const EditEvent = ({event}) => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [editedEventName, setEditedEventName] = useState(event.name)
    const sessionUser = useSelector(state => state.session.user);
    const [errors, setErrors] = useState([]);
    const tasks = useSelector(state => state.pageState?.events[event.id]?.tasks)


    
    const handleEditEvent = async(e) => {
        e.preventDefault()
        if(editedEventName !== ""){
            const editedEvent = {
                id: event.id,
                name: editedEventName,
                user_id: sessionUser.id
            }
            await dispatch(editOneEvent(editedEvent)).then(()=> dispatch(getAllEvents()))
            setShowModal(false)
            setErrors([])
        }else{
            errors.push("Give your event a name!")
        }
    }
        

    const handleDeleteEvent = async(e) => {
        e.preventDefault()
        await dispatch(removeEvent(event.id)).then(()=> dispatch(getAllEvents()))
        setShowModal(false)        
    }

    return (
        <>
        <div className="event-link">
            <Link to={{
                pathname: `/events/${event.id}`,
                state: { event: event}
            }}>{event.name}</Link>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
        </div>
            
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