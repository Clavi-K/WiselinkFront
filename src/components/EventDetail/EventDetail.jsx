import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from "./style.module.css"
import { wipeDetails } from '../../redux/actions'
import { dateParser } from '../../utils'

const EventDetail = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.userInfo)
    const currentEvent = useSelector(state => state.currentEvent)

    useEffect(() => {
        if (!userInfo) navigate("/")
    }, [])

    const backButtonHandler = () => {
        navigate("/events")
    }

    return (
        <div className={`${s.eventDetail}`}>

            <button onClick={backButtonHandler} className={`${s.backButton} ${s.hover}`}>⬅</button>

            <div className={`${s.header}`}>
                <h1>{currentEvent.title} {currentEvent.status === "DRAFT" ? `(${currentEvent.status})` : null}</h1>
                <p>{currentEvent.shortDescription}</p>
            </div>

            <hr />

            <div className={`${s.descriptionDiv}`}>
                <h1>Description:</h1>
                <p>{currentEvent.longDescription}</p>
            </div>

            <hr />

            <div className={`${s.placeAndDate}`}>
                <p>When? {dateParser(currentEvent.dateTime)}</p>
                <p>Where? {currentEvent.address}</p>
            </div>

            <p>Brough to you by: {currentEvent.organizer}</p>

            <div className={`${s.buttonContainer}`}>
                <button hidden={new Date(currentEvent.dateTime) < Date.now() || currentEvent.status === "DRAFT"} className={`${s.button} ${s.hover}`}>Im going!</button>
            </div>

        </div>
    )
}

export default EventDetail