const GET_EVENTS = 'session/GET_EVENTS'
const CREATE_EVENT = 'session/CREATE_EVENT';
const EDIT_EVENT = 'session/EDIT_EVENT';
const DELETE_EVENT = 'session/DELETE_EVENT'

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

export const deleteEvent = (id) => ({
    type: DELETE_EVENT,
    payload: id
})

export const removeEvent = (id) => async(dispatch) => {
    const res = await fetch(`/api/events/${id}`, {
        method:"DELETE"
    })

    if(res.ok) {
        const event = await res.json()
        await dispatch(deleteEvent(event))
        return event
    }
}

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
    }else {
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
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
    }else{
        const data = await res.json();
        if (data.errors) {
          return data.errors;
        }
      }
}


// ---- tasks -----
const ADD_TASK = 'session/ADD_TASK'
const EDIT_TASK = 'session/EDIT_TASK'
const DELETE_TASK = 'session/DELETE_TASK'

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
}) 

export const editTask = (task) => ({
    type: EDIT_TASK,
    payload: task
})

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    payload: id
})


export const editOneTask = (task) => async(dispatch) => {
    const response = await fetch(`/api/events/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    })
    if(response.ok) {
        const task = await response.json();
        await dispatch(editTask(task))
        return task
    }
}

export const removeTask = (id) => async(dispatch) => {
    const res = await fetch(`/api/events/tasks/${id}`, {
        method:"DELETE"
    })

    if(res.ok) {
        const task = await res.json()
        await dispatch(deleteTask(task))
        return task
    }
}

export const createTask = (task) => async(dispatch) => {
    const response = await fetch(`/api/events/tasks`,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
    })
// console.log(task)
    if(response.ok) {
        const task = await response.json()
        // console.log(task)
        await dispatch(addTask(task))
        return task
    }
}


const initialState = { events: {}}

export default function eventsReducer(state= initialState, action) {
    const newState = { ...state }

    switch(action.type) {
        case GET_EVENTS:
            newState.events = action.payload
            return newState
        case CREATE_EVENT:
            newState.events[action.payload.id] = action.payload
            return newState
        case EDIT_EVENT:
            newState.events[action.payload.id] = action.payload
            return newState
        case DELETE_EVENT:
            delete newState.events[action.payload.id]
            return newState
        case ADD_TASK:
            newState.events[action.payload.event_id].tasks[action.payload.id] = action.payload
            return newState
        default:
        return state
    }
}