import React from 'react'
import { isUserLoggedIn } from '../../services/auth';
import { Navigate, Outlet } from 'react-router';

function PrivateUserPanelGate() {
    let loggedIn = isUserLoggedIn();

    return loggedIn ? <Outlet></Outlet> : <Navigate to={"/login"}></Navigate>
}


export default PrivateUserPanelGate;


