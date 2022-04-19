import './sidebar.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/modal';
import { createEvent } from '../../store/events';
import { getAllEvents } from '../../store/events';
import { useEffect } from 'react'
import { EditEvent} from '../EditEvent/index'
import { useHistory, Link } from 'react-router-dom';



export const SideBar = () => {

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const events = useSelector(state => state.pageState.events)
    const eventsArr = Object.values(events)
    const dispatch = useDispatch();
    const [eventName, setEventName] = useState('')
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    

    useEffect(() => {
        dispatch(getAllEvents())
    },[dispatch])

    const onSubmit = async(e) => {
        e.preventDefault()
        if(eventName !== ""){
            const event = {
                name: eventName,
                user_id: sessionUser.id
            }
            await dispatch(createEvent(event))   
            setShowModal(false)
            history.push(`/events/${eventsArr[eventsArr.length - 1].id}`)
            setEventName("")
            setErrors([])
        }else{
            errors.push("Give your event a name!")
        }
    }


    return (
        <div className="sidebar-container">
            <div className="sidebar-content">
                <div className="today-link">
                    <Link to="/today"><h2>Today</h2></Link>
                </div>
                <div className="events-list">
                    <div className="add-event-h2">
                        <h2>Events</h2>
                        <div><i onClick={() => setShowModal(true)} className="fa-solid fa-plus"></i>
                    </div>
                        {showModal && (
                            <Modal onClose={() =>setShowModal(false)}>
                                <div className="event-form-modal">
                                    <h2>Add event</h2>
                                    <div className="new-event-form">
                                    <form>
                                        <div id="errors">
                                            {errors.map((error, ind) => (
                                                <div key={ind}>{error}</div>
                                            ))}
                                        </div>
                                        <label>Name</label>
                                        <input
                                        type='text'
                                        required={true}
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
                        <div className="event-list-items">
                            {eventsArr.map(event => (
                                <div key={event.id}>
                                    <EditEvent event={event}/>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
            <div id="resizer"></div>
            <div className="main-content">
            </div>
        </div>
    )
}