
import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
    const role = localStorage.getItem('role');
    if(role === 'admin'){
        return <Outlet />
    }else{
        return <Navigate to="404" />
    }
}
