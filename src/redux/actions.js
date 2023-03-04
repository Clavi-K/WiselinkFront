import axios from "axios"
import jwtDecode from "jwt-decode"

const apiURL = "http://localhost:8082"
const frontURL = "http://localhost:3000"

export const REGISTER = "REGISTER"
export const LOG_OUT = "LOG_OUT"
export const GET_EVENTS = "GET_EVENTS"
export const SET_DETAILS = "SET_DETAILS"
export const WIPE_DETAILS = "WIPE_DETAILS"
export const ADD_EVENT = "ADD_EVENT"

export function registerUser(payload) {

    return async (dispatch) => {

        try {

            const response = await axios.post(`${apiURL}/users/register`, payload)
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

            const response = await axios.post(`${apiURL}/users/login`, payload)
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
            const response = await axios.get(`${apiURL}/events`, { headers: { "authorization": accessToken } })
            return dispatch({ type: GET_EVENTS, payload: response.data })

        } catch (e) {
            alert(e.message)
        }

    }

}

export function createEvent(payload, accessToken) {

    return async (dispatch) => {

        try {

            await axios.post(`${apiURL}/events`, payload, { headers: { "authorization": accessToken } })
            window.location.replace(`${frontURL}/events`);

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

export function selectEvent(payload, accessToken) {

    return async (dispatch) => {

        try {

            await axios.put(`${apiURL}/users/addEvent`, { eventId: payload }, { headers: { "authorization": accessToken } })
            return dispatch({ type: ADD_EVENT, payload })

        } catch (e) {
            alert(e.message)
        }

    }

}

export function deleteEvent(payload, accessToken) {

    return async (dispatch) => {

        try {

            await axios.delete(`${apiURL}/events/`, { headers: { "authorization": accessToken }, data: { eventId: payload } })
            window.location.replace(`${frontURL}/events`)

        } catch (e) {
            alert(e.response.data.error)
        }

    }

}