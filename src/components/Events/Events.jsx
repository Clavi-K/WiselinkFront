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
        if (!userInfo) navigate("/")
        if (userInfo) dispatch(getEvents(userInfo.accessToken))
    }, [])

    return (
        <div>
            <h1 className={`${s.title}`}>Available events</h1>

            <div onClick={() => console.log("A")} className={`${s.eventsContainer}`}>
                {events ?
                    events.map(e => (

                        <div className={`${s.eventCard}`} key={e.id}>

                            <div className={`${s.topCard}`}>
                                <p className={`${s.eventTitle}`}>{e.title}</p>
                                <p className={`${s.eventDate}`}>{dateParser(e.dateTime)}</p>
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

function dateParser(dateTime) {
    const date = new Date(dateTime)
    const hours = date.getHours() === 0 ? "00" : date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()} - ${hours}:${minutes}`
}