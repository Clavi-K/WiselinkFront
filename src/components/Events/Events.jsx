import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from "./style.module.css"
import { deleteEvent, getEvents, setDetails } from '../../redux/actions'
import { dateParser } from '../../utils'

const Events = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const events = useSelector(state => state.events)
    const userInfo = useSelector(state => state.userInfo)

    let filteredEvents = [...events]

    const [myEvents, setMyEvents] = useState(false)

    useEffect(() => {
        if (!userInfo) navigate("/")
        if (userInfo) dispatch(getEvents(userInfo.accessToken))
    }, [])

    if (myEvents) filteredEvents = filterMyEvents(userInfo.user.events, filteredEvents)

    return (
        <div>
            <h1 onClick={() => setMyEvents(!myEvents)} className={`${s.title}`}>{!myEvents ? `Available events ` : `My events`}</h1>

            <div className={`${s.eventsContainer}`}>
                {filteredEvents ?
                    filteredEvents.map(e => (

                        <div className={`${s.eventCard} ${e.deleted ? s.deleted : null}`} key={e._id}>

                            <div className={`${s.topCard}`}>
                                <p className={`${s.eventTitle}`}>{e.title}</p>
                                <p className={`${s.eventDate}`}>{dateParser(e.dateTime)}</p>
                                <button onClick={() => dispatch(deleteEvent(e._id, userInfo.accessToken))} className={`${s.deleteButton}`} hidden={userInfo.user.role !== "ADMIN" || e.deleted}>X</button>
                            </div>

                            <div className={`${s.bottomCard}`}>
                                <p className={`${s.eventSDescription}`}>{e.shortDescription}</p>

                                <button className={`${s.detailButton}`} onClick={() => {
                                    dispatch(setDetails(e))
                                    navigate("/events/details")
                                }} >See details</button>

                                <p className={`${s.draftFlag}`}>{e.status === "DRAFT" ? `(${e.status})` : null}</p>
                            </div>

                        </div>
                    ))
                    : null}
            </div>

        </div>
    )
}

export default Events


function filterMyEvents(userEvents, events) {
    return events.filter(e => userEvents.includes(e._id))
}