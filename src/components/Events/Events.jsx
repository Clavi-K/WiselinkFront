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

    const [fromDateFilter, setFromDateFilter] = useState("")
    const [toDateFilter, setToDateFilter] = useState("")
    const [titleFilter, setTitleFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")

    useEffect(() => {
        if (!userInfo) navigate("/")
        if (userInfo) dispatch(getEvents(userInfo.accessToken))
    }, [])

    if (myEvents) filteredEvents = filterMyEvents(userInfo.user.events, filteredEvents)

    filteredEvents = filterByFromDate(fromDateFilter, filteredEvents)
    filteredEvents = filterByToDate(toDateFilter, filteredEvents)
    filteredEvents = filterByTitle(titleFilter, filteredEvents)
    filteredEvents = filterByStatus(userInfo.user.role, statusFilter, filteredEvents)

    const statusHandler = () => {

        setStatusFilter(curr => {

            if (curr === "Published") return "Draft"
            return "Published"

        })

    }

    return (
        <div>
            <div className={`${s.filters}`}>

                <p className={`${s.filtersTitle}`}>Filters:</p>

                <div className={`${s.filtersContainer}`}>
                    <div className={`${s.filter}`}>
                        <label htmlFor='fromDate'>From:</label>
                        <input type="date" name="fromDate" onChange={(e) => setFromDateFilter(e.target.value)} value={fromDateFilter} />
                    </div>

                    <div className={`${s.filter}`}>
                        <label htmlFor='toDate'>To:</label>
                        <input type="date" name="toDate" onChange={(e) => setToDateFilter(e.target.value)} value={toDateFilter} />
                    </div>

                    <div className={`${s.filter}`}>
                        <label htmlFor='title'>Title:</label>
                        <input type="text" name="title" onChange={(e) => setTitleFilter(e.target.value)} value={titleFilter} />
                    </div>

                    <div hidden={userInfo.user.role !== "ADMIN"} className={`${s.filter}`}>
                        <label htmlFor="status">Status</label>

                        <select onChange={(e) => { setStatusFilter(e.target.value) }} value={statusFilter} name="staus" id="">
                            <option value="ALL">All</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="DRAFT">Draft</option>
                        </select>

                    </div>

                </div>



            </div>

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

function filterByFromDate(fromDate, events) {

    const date = new Date(fromDate)

    if (date != "Invalid Date") {
        return events.filter(e => new Date(e.dateTime) > date)
    }

    return events

}

function filterByToDate(fromDate, events) {

    const date = new Date(fromDate)

    if (date != "Invalid Date") {
        return events.filter(e => new Date(e.dateTime) < date)
    }

    return events

}

function filterByTitle(title, events) {

    if (title != undefined && title.trim() !== "") {
        return events.filter(e => e.title.toLowerCase().includes(title))
    }

    return events

}

function filterByStatus(role, status, events) {

    if (role === "ADMIN" && status !== "ALL") {
        return events.filter(e => e.status.toLowerCase() === status.toLowerCase())
    }

    return events

}