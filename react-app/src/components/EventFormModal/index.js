import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import './eventformmodal.css'
import { createEvent } from '../../store/events';

export const EventFormModal = () => {

    const dispatch = useDispatch();
    const [eventName, setEventName] = useState('')
    const sessionUser = useSelector(state => state.session.user);

    const onSubmit = async(e) => {
        e.preventDefault()

        const event = {
            name: eventName,
            user_id: sessionUser.id
        }
        dispatch(createEvent(event))

    }

    return display && mount && ReactDOM.createPortal(
    <div className='event-modal-background' onClick={closeModal}>
        <div >
        <form onSubmit={onSubmit}>
            <label>Name</label>
            <input
            type='text'
            value={eventName}
            onChange={e => setEventName(e.target.value)}
            />
        </form>
        <button type="submit">Start Planning</button>
        </div>
    </div>
    , mount)
}

export default Modal;