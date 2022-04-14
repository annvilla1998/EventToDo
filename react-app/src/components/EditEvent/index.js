import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from '../../context/modal';
import { useDispatch } from 'react-redux'



export const EditEvent = ({event, setIsLoaded}) => {
    const [showModal, setShowModal] = useState(false)
    const [editedEventName, setEditedEventName] = useState(event.name)

    const onSubmit = async(e) => {
        e.preventDefault()

        const event = {
            name: eventName,
            user_id: sessionUser.id
        }
        await dispatch(createEvent(event)).then(() => setIsLoaded(true))
        setShowModal(false)
        setEventName("")
        
    }

    return (
        <>
            <Link key={event.id} to={`/events/${event.id}`}>{event.name}</Link>
            <i onClick={() => setShowModal(true)} class="fa-solid fa-ellipsis"></i>
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
                        <button onClick={onSubmit} type="submit">Edit</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
} 