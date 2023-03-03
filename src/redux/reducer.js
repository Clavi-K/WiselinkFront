/* ----- INITIAL STATE ----- */

import { GET_EVENTS, LOG_OUT, REGISTER } from "./actions"

const initialState = {
    events: [],
    userInfo: undefined
}

/* ---------- */

/* ----- REDUCER EXPORT ----- */

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case REGISTER:
            return { ...state, userInfo: action.payload }

        case LOG_OUT:
            return { events: [], userInfo: undefined }

        case GET_EVENTS:
            return { ...state, events: action.payload }

        default:
            return state

    }

}

/* ---------- */
