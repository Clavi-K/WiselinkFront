/* ----- INITIAL STATE ----- */

import { LOG_IN, LOG_OUT, REGISTER } from "./actions"

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

        default:
            return state

    }

}

/* ---------- */
