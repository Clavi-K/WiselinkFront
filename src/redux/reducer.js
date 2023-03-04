/* ----- INITIAL STATE ----- */

import { GET_EVENTS, LOG_OUT, REGISTER, SET_DETAILS, WIPE_DETAILS } from "./actions"

const initialState = {
    events: [],
    currentEvent: undefined,
    userInfo: undefined
}

/* ---------- */

/* ----- REDUCER EXPORT ----- */

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case REGISTER:
            return { ...state, userInfo: action.payload }

        case LOG_OUT:
            return initialState

        case GET_EVENTS:
            return { ...state, events: action.payload }

        case SET_DETAILS:
            return { ...state, currentEvent: action.payload }

        case WIPE_DETAILS:
            return { ...state, currentEvent: undefined }

        default:
            return state

    }

}

/* ---------- */
