import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useNavigate } from 'react-router-dom'

import { eventValidation } from '../../utils'
import s from "./style.module.css"
import { createEvent } from '../../redux/actions'

const CreateEvent = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector(state => state.userInfo)

    useEffect(() => {
        if (!userInfo) navigate("/")
        if (userInfo && userInfo.user.role !== "ADMIN") navigate("/events")
    })

    const initialValues = {
        title: "",
        shortDescription: "",
        longDescription: "",
        address: "",
        organizer: "",
        date: "",
        time: "",
        status:"PUBLISHED"
    }

    const submitHandler = async (values) => {
        values.dateTime = `${values.date} ${values.time}`
        await dispatch(createEvent(values, userInfo.accessToken))
    }

    return (
        <Formik initialValues={initialValues} onSubmit={submitHandler} validate={eventValidation}>

            {({ isSubmitting }) => (
                < Form className={`${s.form}`}>

                    <h1 className={`${s.title}`}>Event creation form</h1>

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
                        <Field as="select" name="status" className={`${s.input}`}>
                            <option value="PUBLISHED">Published</option>
                            <option value="DRAFT">Draft</option>
                        </Field>
                    </div>

                    <button type="submit" hidden={isSubmitting} className={`${s.submitButton}`}>Create event!</button>

                </Form>
            )}

        </Formik >)
}

export default CreateEvent