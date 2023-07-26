import React, { useContext, useEffect, useState } from 'react'


import logo from '../../assets/images/logo.png'
import { getLoggedUser } from '../../services/auth'
import { BASE_URL_IMAGE } from '../../services/Util';

function Navbar() {
    const [user, setUser] = useState([]);
    useEffect(()=>{
        setUser(getLoggedUser())
    },[])




    return (
        <>
            {/* <!-- navbar top --> */}
            <nav className="navbar">
                <div className="nav-logo">
                    <img src={logo} className="logo-img" alt="logo" />
                    <span className="logo-text">TalkStar</span>
                </div>
                {/* <!-- navbar links --> */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="" className="nav-link"><i className="far fa-file"></i><span>Resume</span></a>
                    </li>
                    <li className="nav-item">
                        <a href="" className="nav-link"><i className="far fa-address-book"></i><span>Contacts</span></a>
                    </li>
                    <li className="nav-item">
                        <a href="" className="nav-link"><i className="fas fa-signal" aria-hidden="true"></i><span>Statistics</span></a>
                    </li>
                    <li className="nav-item active">
                        <a href="" className="nav-link"><i className="far fa-comments"></i><span>Chats</span></a>
                    </li>
                    <li className="nav-item">
                        <a href="" className="nav-link"><i className="fas fa-tools"></i><span>Settings</span></a>
                    </li>
                </ul>
                {/* <!-- nav bar user info --> */}
                <div className="nav-user">
                    <div>
                        <span>{user.username}</span>
                        <span>Active</span>
                    </div>
                    <img className="nav-user-img" src={BASE_URL_IMAGE+user.image+".jpg"} alt="User" />
                </div>
            </nav>
        </>
    )
}

export default Navbar