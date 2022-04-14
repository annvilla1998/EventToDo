import './sidebar.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/modal';
import { createEvent } from '../../store/events';
import { getAllEvents } from '../../store/events';
import { useEffect } from 'react'
import { EditEvent} from '../EditEvent/index'


export const SideBar = () => {

    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)


    const dispatch = useDispatch();
    const [eventName, setEventName] = useState('')
    const sessionUser = useSelector(state => state.session.user);

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

    const events = useSelector(state => state.pageState.events)
    const eventsArr = Object.values(events)

    useEffect(() => {
      dispatch(getAllEvents()).then(() => setIsLoaded(true)) 
    },[dispatch])

    return (
        <div className="sidebar-container">
            <div className="sidebar-content">
                <div className="events-list">
                    <div>
                        <h2>Events</h2>
                        <div><i onClick={() => setShowModal(true)} className="fa-solid fa-plus"></i>
                    </div>
                        {showModal && (
                            <Modal onClose={() =>setShowModal(false)}>
                                <div className="event-form-modal">
                                    <div>
                                    <form>
                                        <label>Name</label>
                                        <input
                                        type='text'
                                        value={eventName}
                                        onChange={e => setEventName(e.target.value)}
                                        />
                                    </form>
                                    <button onClick={onSubmit} type="submit">Start Planning</button>
                                    </div>
                                </div>
                            </ Modal>
                        )}
                    </div>
                    {isLoaded &&
                        <div className="event-list-items">
                            {eventsArr.map(event => (
                                <div key={event.id}>
                                    <EditEvent  setIsLoaded={setIsLoaded} event={event}/>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
            <div id="resizer"></div>
            <div className="main content">
                
            </div>
        </div>
    )
}