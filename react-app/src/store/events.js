
const CREATE_EVENT = 'session/CREATE_EVENT';

export const addEvent = (event) => ({
    type: CREATE_EVENT,
    payload: event
})

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




const initialState = {}

export default function eventsReducer(state= initialState, action) {
    const newState = { ...state }

    switch(action.type) {
        case CREATE_EVENT:
            newState.pageState[action.payload] = action.payload
            return newState
    }
    return state
}