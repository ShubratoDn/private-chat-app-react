import React, { useContext, useEffect } from 'react'
import { doLogout } from '../services/auth'
import { Navigate, useNavigate } from 'react-router';
import ActiveChatContext from '../context/ActiveChatContext';

function Logout() {

    const navigate  = useNavigate();
    const activeChatUser = useContext(ActiveChatContext);

    doLogout(()=>{
        activeChatUser.updateActiveChatUser(null);
        console.log("Logged out")
    });

    useEffect(()=>{
        navigate("/chat-dashboard");
    },[])

}

export default Logout