import axios from "axios"
import jwtDecode from "jwt-decode"

export const REGISTER = "REGISTER"
export const LOG_OUT = "LOG_OUT"

export function registerUser(payload) {

    return async (dispatch) => {

        try {

            const response = await axios.post("http://localhost:8082/users/register", payload)
            const user = jwtDecode(response.data)
            return dispatch({ type: REGISTER, payload: {user, accessToken: response.data} })

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
            return dispatch({type: REGISTER, payload: {user, accessToken: response.data}})

        } catch(e) {
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
