import React, { useEffect } from 'react'

import { Formik, Form, Field, ErrorMessage } from "formik"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'

import { loginValidation } from '../../utils'
import { loginUser } from "../../redux/actions"
import s from "./style.module.css"

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector(state => state.userInfo)

    useEffect(() => {
        if (userInfo) navigate("/events")
    })

    const initialValues = {
        email: "",
        password: "",
    }

    const submitHandler = async (values) => {
        await dispatch(loginUser(values))
    }

    return (
        <Formik initialValues={initialValues} onSubmit={submitHandler} validate={loginValidation}>

            {({ isSubmitting }) => (
                < Form className={`${s.form}`}>

                    <h1 className={`${s.title}`}>Log in!</h1>

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

                    <button type="submit" hidden={isSubmitting} className={`${s.submitButton}`}>Log in!</button>
                    <p>Don't have an account? <NavLink className={`${s.navlink}`} to="/">Register now!</NavLink></p>

                </Form>
            )}

        </Formik >)
}

export default Login