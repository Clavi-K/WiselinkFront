import axios from "axios"
import jwtDecode from "jwt-decode"

export const REGISTER = "REGISTER"
export const LOG_OUT = "LOG_OUT"
export const GET_EVENTS = "GET_EVENTS"
export const SET_DETAILS = "SET_DETAILS"
export const WIPE_DETAILS = "WIPE_DETAILS"


export function registerUser(payload) {

    return async (dispatch) => {

        try {

            const response = await axios.post("http://localhost:8082/users/register", payload)
            const user = jwtDecode(response.data)
            return dispatch({ type: REGISTER, payload: { user, accessToken: response.data } })

        } catch (e) {
            alert(e.message)
        }

    }

}

export function loginUser(payload) {

    return async (dispatch) => {

        try {

            const response = await axios.post("http://localhost:8082/users/login", payload)
            const user = jwtDecode(response.data)
            return dispatch({ type: REGISTER, payload: { user, accessToken: response.data } })

        } catch (e) {
            alert(e.message)
        }

    }

}

export function logOut() {

    return async (dispatch) => {

        try {
            return dispatch({ type: LOG_OUT })
        } catch (e) {
            alert(e)
        }

    }

}

export function getEvents(accessToken) {

    return async dispatch => {

        try {
            const response = await axios.get("http://localhost:8082/events", { headers: { "authorization": accessToken } })
            return dispatch({ type: GET_EVENTS, payload: response.data })

        } catch (e) {
            alert(e.message)
        }

    }

}

export function createEvent(payload, accessToken) {

    return async (dispatch) => {

        try {

            await axios.post("http://localhost:8082/events", payload, { headers: { "authorization": accessToken } })
            window.location.replace("http://localhost:3000/events");

        } catch (e) {
            alert(e.message)
        }

    }

}

export function setDetails(payload) {

    return (dispatch) => {

        try {
            return dispatch({ type: SET_DETAILS, payload })
        } catch (e) {
            alert(e.message)
        }

    }

}

export function wipeDetails() {

    return (dispatch) => {

        try {
            return dispatch({ type: WIPE_DETAILS })
        } catch (e) {
            alert(e.message)
        }

    }

}