import React from 'react'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from "formik"

import s from "./style.module.css"
import { dateParser } from '../../utils'
import { eventValidation } from "../../utils"
import { editEvent } from '../../redux/actions'

const EditEvent = ({ displayState, setDisplayState, event, accessToken }) => {

    const dispatch = useDispatch()

    const parsedDate = dateParser(event.dateTime)
    const initialTime = parsedDate.split(" - ")[1]
    const initialDate = editDateParser(event.dateTime)

    const initialValues = {
        title: event.title,
        shortDescription: event.shortDescription,
        longDescription: event.longDescription,
        address: event.address,
        organizer: event.organizer,
        date: initialDate,
        time: initialTime,
        status: event.staus,
        deleted: event.deleted
    }

    const submitHandler = async (values) => {
        values.dateTime = `${values.date} ${values.time}`
        dispatch(editEvent({ eventId: event._id, newEvent: values }, accessToken))
    }

    return (<>
        {displayState &&

            <div className={`${s.background}`}>

                <section className={`${s.formContainer}`}>

                    <div className={`${s.ftromTitleWrap}`}>
                        <h3 className={`${s.formTitle}`}>Edit event</h3>
                    </div>

                    <button onClick={() => setDisplayState(!displayState)} className={`${s.closeButton}`}>X</button>

                    <Formik initialValues={initialValues} onSubmit={submitHandler} validate={eventValidation}>

                        {({ isSubmitting }) => (
                            < Form className={`${s.form}`}>

                                <div className={`${s.formInput}`}>
                                    <label htmlFor='title'>Title:</label>
                                    <Field type="text" name="title" className={`${s.input}`} component="input" />
                                    <ErrorMessage name="title" component={"p"} className={`${s.errorMsg}`} />
                                </div>

                                <div className={`${s.formInput}`}>
                                    <label htmlFor='shortDescription'>Short Description:</label>
                                    <Field maxLength="100" type="text" name="shortDescription" className={`${s.input}`} component="input" />
                                    <ErrorMessage name="shortDescription" component={"p"} className={`${s.errorMsg}`} />
                                </div>

                                <div className={`${s.formInput}`}>
                                    <label className={`${s.textareaLabel}`} htmlFor='longDescription'>Long Description:</label>
                                    <Field cols="23" type="text" name="longDescription" className={`${s.input} ${s.textareaInput}`} component="textarea" />
                                    <ErrorMessage name="longDescription" component={"p"} className={`${s.errorMsg}`} />
                                </div>

                                <div className={`${s.formInput}`}>
                                    <label htmlFor='address'>Address:</label>
                                    <Field type="text" name="address" className={`${s.input}`} component="input" />
                                    <ErrorMessage name="address" component={"p"} className={`${s.errorMsg}`} />
                                </div>

                                <div className={`${s.formInput}`}>
                                    <label htmlFor='organizer'>Organizer:</label>
                                    <Field type="text" name="organizer" className={`${s.input}`} component="input" />
                                    <ErrorMessage name="organizer" component={"p"} className={`${s.errorMsg}`} />
                                </div>

                                <div className={`${s.formInput}`}>
                                    <label htmlFor='date'>Date:</label>
                                    <Field type="date" name="date" className={`${s.input}`} component="input" />
                                    <ErrorMessage name="date" component={"p"} className={`${s.errorMsg}`} />
                                </div>

                                <div className={`${s.formInput}`}>
                                    <label htmlFor='time'>Time:</label>
                                    <Field type="time" name="time" className={`${s.input}`} component="input" />
                                    <ErrorMessage name="time" component={"p"} className={`${s.errorMsg}`} />
                                </div>

                                <div className={`${s.formInput}`}>
                                    <label htmlFor='status'>Status:</label>
                                    <Field as="select" defaultValue={event.status} name="status" className={`${s.input}`}>
                                        <option value="PUBLISHED">Published</option>
                                        <option value="DRAFT">Draft</option>
                                    </Field>
                                </div>

                                <div className={`${s.formInput}`}>
                                    <label htmlFor='status'>Deleted:</label>
                                    <Field type="checkbox" name="deleted" className={`${s.checkInput}`} />
                                </div>

                                <button type="submit" hidden={isSubmitting} className={`${s.submitButton}`}>Edit event</button>

                            </Form>
                        )}

                    </Formik >

                </section>

            </div>

        }
    </>)
}

export default EditEvent

function editDateParser(dateTime) {
    const date = new Date(dateTime)
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
}