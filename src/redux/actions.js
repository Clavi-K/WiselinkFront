import axios from "axios"
import jwtDecode from "jwt-decode"

export const REGISTER = "REGISTER"
export const LOG_OUT = "LOG_OUT"
export const GET_EVENTS = "GET_EVENTS"

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
            const response = await axios.get("http://localhost:8082/events", { headers: { 
            "Access-Control-Allow-Headers":"authorization",
            "Access-Control-Allow-Methods": "OPTIONS",     
            "authorization": accessToken } })
            return dispatch({ type: GET_EVENTS, payload: response.data })

        } catch (e) {
            alert(e.message)
        }

    }

}