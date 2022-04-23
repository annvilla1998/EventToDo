import './sidebar.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/modal';
import { createEvent } from '../../store/events';
import { getAllEvents } from '../../store/events';
import { useEffect } from 'react'
import { EditEvent} from '../EditEvent/index'
import { useHistory, Link } from 'react-router-dom';
// import Split from 'react-split'


export const SideBar = () => {

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState([]);
    const events = useSelector(state => state.pageState.events)
    const eventsArr = Object.values(events)
    const dispatch = useDispatch();
    const [eventName, setEventName] = useState('')
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [backgroundColor, setBackgroundColor] = useState("")
    const [textColor, setTextColor] = useState("")
    

    useEffect(() => {
        dispatch(getAllEvents())
    },[dispatch])

    const validate = () => {
        const validationErrors = []

        if(eventName === ""){
            validationErrors.push("Give your event a name!")
        }
        
        return validationErrors
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        
        const errors = validate()

        if(errors.length > 0) return setErrors(errors)

        const event = {
            name: eventName,
            text_color: textColor,
            background_color: backgroundColor,
            user_id: sessionUser.id
        }
        await dispatch(createEvent(event)).then(event => {
            if(event.errors){
                setErrors(event.errors)
                setEventName("")
            }else{
                history.push(`/events/${event.id}`)
                setShowModal(false)
                setErrors([])
                setEventName("")
            }
        }) 
    }


    return (
        // <Split direction='horizontal' style={{width: 'calc(100px - 4rem'}}>
            
            <div className="sidebar-container">
                <div className="sidebar-content">
                    <div className="today-link">
                        <Link to="/today"><h3>Today</h3></Link>
                    </div>
                    <div className="today-link">
                        <Link to="/completed"><h3>Completed</h3></Link>
                    </div>
                    <div className="events-list">
                        <div className="add-event-h3">
                            <h3>Events</h3>
                            <div><i onClick={() => setShowModal(true)} className="fa-solid fa-plus"></i>
                        </div>
                            {showModal && (
                                <Modal onClose={() =>setShowModal(false)}>
                                    <div className="event-form-modal">
                                        <h3>Add event</h3>
                                        <div className="new-event-form">
                                        <form>
                                            <div id="errors">
                                                {errors?.map((error, ind) => (
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
                                            <label>Text Color</label>
                                            <input 
                                            type="color"
                                            value={textColor}
                                            onChange={e => setTextColor(e.target.value)}
                                            />
                                            <label>Background Color</label>
                                            <input 
                                            type="color"
                                            value={backgroundColor}
                                            onChange={e => setBackgroundColor(e.target.value)}
                                            />
                                        </form>
                                        <button className="btn" onClick={onSubmit} type="submit">Start Planning</button>
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
        // </Split>
    )
}