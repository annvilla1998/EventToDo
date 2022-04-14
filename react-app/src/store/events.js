const GET_EVENTS = 'session/GET_EVENTS'
const CREATE_EVENT = 'session/CREATE_EVENT';
const EDIT_EVENT = 'session/EDIT_EVENT'

export const addEvent = (event) => ({
    type: CREATE_EVENT,
    payload: event
})

export const getEvents = (events) => ({
    type: GET_EVENTS,
    payload: events
})

export const editEvent = (event) => ({
    type: EDIT_EVENT,
    payload: event
}) 

export const getAllEvents = () => async (dispatch) => {
    const res = await fetch(`/api/events/`)
    if(res.ok) {
        const events = await res.json()
        await dispatch(getEvents(events))
    }
}

export const createEvent = (event) => async (dispatch) => {
    const res = await fetch(`/api/events/`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(event)
    })
    if(res.ok) {
        const event = await res.json()
        await dispatch(addEvent(event))
    }
}

export const editOneEvent = (event) => async (dispatch) => {
    const res = await fetch(`/api/events/${event.id}`,{
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event)
      })

    if(res.ok) {
        const event = await res.json()
        await dispatch(editEvent(event))
        return event
    }
}




const initialState = { events: {}}

export default function eventsReducer(state= initialState, action) {
    const newState = { ...state }

    switch(action.type) {
        case GET_EVENTS:
            action.payload.events.forEach(event => {
               return newState.events[event.id] = event
            })
            return newState
        case CREATE_EVENT:
            newState.events[action.payload.id] = action.payload
            return newState
        case EDIT_EVENT:
            newState.events[action.payload.id] = action.payload
            return newState
        default:
        return state
    }
}