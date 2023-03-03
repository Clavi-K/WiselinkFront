import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from "./style.module.css"
import { getEvents } from '../../redux/actions'

const Events = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const events = useSelector(state => state.events)
    const userInfo = useSelector(state => state.userInfo)

    useEffect(() => {
        if(!userInfo) navigate("/")
        dispatch(getEvents(userInfo.accessToken))
    })

    return (


        <div>Events</div>
    )
}

export default Events