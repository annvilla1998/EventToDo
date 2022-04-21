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

export const createEvent = (data) => async (dispatch) => {
    const res = await fetch(`/api/events/`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const event = await res.json()
    if(!event.errors) {
        dispatch(addEvent(event))
    }
    return event

    // if(res.ok) {
    //     const event = await res.json()
    //     await dispatch(addEvent(event))
    //     return event
    // }else {
    //     const data = await res.json();
    //     if (data.errors) {
    //       return data.errors;
    //     }
    //   }
}

export const editOneEvent = (data) => async (dispatch) => {
    const res = await fetch(`/api/events/${data.id}`,{
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      const event = await res.json()
      if(!event.errors) {
          dispatch(addEvent(event))
      }
      return event
    // if(res.ok) {
    //     const event = await res.json()
    //     await dispatch(editEvent(event))
    //     return event
    // }else{
    //     const data = await res.json();
    //     if (data.errors) {
    //       return data.errors;
    //     }
    //   }
}


// ---- Tasks -----
const ADD_TASK = 'session/ADD_TASK'
const EDIT_TASK = 'session/EDIT_TASK'
const DELETE_TASK = 'session/DELETE_TASK'
const GET_TASKS = 'session/GET_TASKS'
const SET_COMPLETED = 'session/SET_COMPLETED'
const GET_COMPLETED = 'session/GET_COMPLETED'
const GET_TODAY_TASKS = 'session/GET_TODAY_TASKS'

export const getCompleted = (tasks) => ({
    type: GET_COMPLETED,
    payload: tasks
})

export const getToday = (tasks) => ({
    type: GET_TODAY_TASKS,
    payload: tasks
})

export const getTasks = (tasks) => ({
    type: GET_TASKS,
    payload: tasks
})

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

export const setCompleted = (task) => ({
    type: SET_COMPLETED,
    payload: task
})

export const getCompletedTasks = () => async(dispatch) => {
    const response = await fetch('/api/tasks/completed')
    if(response.ok){
        const tasks = await response.json()
        await dispatch(getCompleted(tasks))
    }
}

export const getTodayTasks = () => async(dispatch) => {
    const response = await fetch('/api/tasks/today')
    if(response.ok){
        const tasks = await response.json()
        await dispatch(getToday(tasks))
    }
}

export const setCompletedTask = (task) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${task.id}`,{
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

export const getAllTasks = (id) => async(dispatch) => {
    const response = await fetch(`/api/events/${id}/tasks`)
    if(response.ok){
        const tasks = await response.json()
        // console.log(tasks)
        await dispatch(getTasks(tasks))
    }
}

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


const initialState = { events: {}, tasks: {}}

export default function eventsReducer(state= initialState, action) {
    
    switch(action.type) {
        case GET_EVENTS:
            let newState = {...state, events: {...action.payload}}
            return newState
        case CREATE_EVENT:
            return {
                ...state, 
                events: {
                    ...state.events,
                    [action.payload.id]: action.payload
                },
            }
        case EDIT_EVENT:
            state.events[action.payload.id] = action.payload
            return { 
                ...state,
                events: {
                    ...state.events
                },
            }
        case DELETE_EVENT:
            delete state.events[action.payload.id]
            return {
                ...state,
                events: {
                    ...state.events
                }
            }
        case GET_TASKS:
            return {
                ...state,
                events: {
                    ...state.events
                },
                tasks: {
                    ...action.payload
                }
            }
        
        case ADD_TASK:        
           return {
               ...state,
               events: {
                   ...state.events
               },
               tasks: {
                ...state.tasks,
                [action.payload.id]: action.payload
                }
           }
        case EDIT_TASK:
           state.tasks[action.payload.id] = action.payload
           return {
               ...state,
               events: {
                   ...state.events,
               },
               tasks: {
                   ...state.tasks
               }
           }
        case DELETE_TASK:
            delete state.tasks[action.payload.id]
            return {
                ...state,
                events: {
                    ...state.events
                },
                tasks: {
                    ...state.tasks
                }
            }
        case SET_COMPLETED:
            state.tasks[action.payload.id].completed = action.payload.completed
           return {
               ...state,
               events: {
                   ...state.events,
               },
               tasks: {
                   ...state.tasks
               }
           }
        case GET_TODAY_TASKS:
            return {...state, tasks: {...action.payload}}
        case GET_COMPLETED:
            return {...state, tasks: {...action.payload}}
        default:
        return state
    }
}