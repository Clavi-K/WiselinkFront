import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import s from "./style.module.css"
import logo from "../../assets/logo.png"
import { logOut } from '../../redux/actions'

const Navbar = ({ userInfo }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const logoutHandler = (e) => {
        dispatch(logOut())
        navigate("/login")
    }

    return (
        <div className={`${s.navbar}`}>
            <img onClick={() => navigate("/events")} className={`${s.wiselinkLogo}`} src={logo} alt="Wiselink logo" />
            {userInfo !== undefined ?
                <div className={`${s.loggedUser}`}>
                    <p className={`${s.userName}`}>{userInfo.user.firstName} {userInfo.user.lastName} {userInfo.user.role === "ADMIN" ? "(Admin)" : null}</p>
                    <button className={`${s.logout}`} hidden={userInfo.user.role !== "ADMIN" || document.URL.includes("/events/create")} onClick={() => navigate("/events/create")}>Create event</button>
                    <button className={`${s.logout}`} onClick={logoutHandler}>Log out</button>
                </div> : null}
        </div>
    )
}

export default Navbar