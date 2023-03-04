import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from "./style.module.css"
import { dateParser } from '../../utils'
import { selectEvent } from '../../redux/actions'
import EditEvent from '../EditEvent/EditEvent'

const EventDetail = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.userInfo)
    const currentEvent = useSelector(state => state.currentEvent)

    const [displayModal, setDisplayModal] = useState(false)

    useEffect(() => {
        if (!userInfo) navigate("/")
    }, [])

    const backButtonHandler = () => {
        navigate("/events")
    }

    const assistHandler = () => {
        dispatch(selectEvent(currentEvent._id, userInfo.accessToken))
    }

    return (
        <div className={`${s.eventDetail}`}>

            <button onClick={backButtonHandler} className={`${s.backButton} ${s.hover}`}>⬅</button>

            <div className={`${s.header}`}>

                <div className={`${s.rowWrap}`}>
                    <button hidden={userInfo.user.role !=="ADMIN"} onClick={() => setDisplayModal(!displayModal)} className={`${s.editButton}`}>🖊</button>
                    <h1>{currentEvent.title} {currentEvent.status === "DRAFT" ? `(${currentEvent.status})` : null}</h1>
                </div>

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

            <p>Brought to you by: {currentEvent.organizer}</p>

            <div className={`${s.buttonContainer}`}>
                <button onClick={assistHandler} hidden={isButtonVisible(userInfo.user, currentEvent)} className={`${s.button} ${s.hover}`}>Im going!</button>
            </div>

            <EditEvent displayState={displayModal} setDisplayState={setDisplayModal} event={currentEvent} accessToken={userInfo.accessToken} />

        </div>
    )
}

export default EventDetail

function isButtonVisible(user, currentEvent) {
    return new Date(currentEvent.dateTime) < Date.now() || currentEvent.status !== "PUBLISHED" || user.events.includes(currentEvent._id)
}