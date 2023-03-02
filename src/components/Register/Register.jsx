import React, { useEffect } from 'react'

import { Formik, Form, Field, ErrorMessage } from "formik"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { registerValidation } from '../../utils'
import { registerUser } from '../../redux/actions'
import s from "./style.module.css"

const Register = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo)

    useEffect(() => {
        if(userInfo) navigate("/events")
    })

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    }

    const submitHandler = async (values) => {
        await dispatch(registerUser(values))
    }

    return (
        <Formik initialValues={initialValues} onSubmit={submitHandler} validate={registerValidation}>

            {({ isSubmitting }) => (
                < Form className={`${s.form}`}>

                    <h1 className={`${s.title}`}>Register!</h1>


                    <div className={`${s.formInput}`}>
                        <label htmlFor='firstName'>First name:</label>
                        <Field type="text" name="firstName" className={`${s.input}`} component="input" />
                        <ErrorMessage name="firstName" component={"p"} className={`${s.errorMsg}`} />
                    </div>

                    <div className={`${s.formInput}`}>
                        <label htmlFor='lastName'>Last name:</label>
                        <Field type="text" name="lastName" className={`${s.input}`} component="input" />
                        <ErrorMessage name="lastName" component={"p"} className={`${s.errorMsg}`} />
                    </div>

                    <div className={`${s.formInput}`}>
                        <label htmlFor='email'>Email:</label>
                        <Field type="email" name="email" className={`${s.input}`} component="input" />
                        <ErrorMessage name="email" component={"p"} className={`${s.errorMsg}`} />
                    </div>

                    <div className={`${s.formInput}`}>
                        <label htmlFor='password'>Password:</label>
                        <Field type="password" name="password" className={`${s.input}`} component="input" />
                        <ErrorMessage name="password" component={"p"} className={`${s.errorMsg}`} />
                    </div>

                    <button type="submit" hidden={isSubmitting} className={`${s.submitButton}`}>Register!</button>

                </Form>
            )}

        </Formik >)
}

export default Register