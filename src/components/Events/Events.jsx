import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from "./style.module.css"
import { getEvents, setDetails } from '../../redux/actions'
import { dateParser } from '../../utils'

const Events = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const events = useSelector(state => state.events)
    const userInfo = useSelector(state => state.userInfo)

    useEffect(() => {
        if (!userInfo) navigate("/")
        if (userInfo) dispatch(getEvents(userInfo.accessToken))
    }, [])

    return (
        <div>
            <h1 className={`${s.title}`}>Available events</h1>

            <div className={`${s.eventsContainer}`}>
                {events ?
                    events.map(e => (

                        <div onClick={() => {
                            dispatch(setDetails(e))
                            navigate("/events/details")
                        }} className={`${s.eventCard} ${e.deleted ? s.deleted : null}`} key={e.id}>

                            <div className={`${s.topCard}`}>
                                <p className={`${s.eventTitle}`}>{e.title}</p>
                                <p className={`${s.eventDate}`}>{dateParser(e.dateTime)}</p>
                                <button className={`${s.deleteButton}`} hidden={userInfo.user.role !== "ADMIN" || e.deleted}>X</button>
                            </div>

                            <div className={`${s.bottomCard}`}>
                                <p className={`${s.eventSDescription}`}>{e.shortDescription}</p>
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

