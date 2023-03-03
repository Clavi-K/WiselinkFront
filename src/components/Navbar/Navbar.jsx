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
            <img src={logo} alt="Wiselink logo" />
            {userInfo !== undefined ?
                <div className={`${s.loggedUser}`}>
                    <p className={`${s.userName}`}>{userInfo.user.firstName} {userInfo.user.lastName}</p>
                    {userInfo.user.role === "ADMIN" ? <p className={`${s.userName}`}>(Admin)</p> : null}
                    <button className={`${s.logout}`} onClick={logoutHandler}>Log out</button>
                </div> : null}
        </div>
    )
}

export default Navbar