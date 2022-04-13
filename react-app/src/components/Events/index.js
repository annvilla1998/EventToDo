import { Link } from 'react-router-dom'
import { useState } from 'react'
import './events.css'
import { EventFormModal } from '../EventFormModal';
import { Modal } from '../../context/modal';



export const Events = ({events}) => {
    const [showModal, setShowModal] = useState(false);



    return (
        <div>
            <div className="events-list">
                <h2>Events</h2>
                <i onClick={() => setShowModal(true)} class="fa-solid fa-plus"></i>
                {showModal && (
                    <Modal onClose={() =>setShowModal(false)}>
                        <EventFormModal events={events} />
                    </ Modal>
                )}
                <div className="event-list-items">
                    {events.map(event => (
                        <Link key={event.id} to={`/events/${event.id}`}>{event.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}