import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './pages/Main'
import Rooms from './pages/Rooms'
import Login from './pages/Login'
import Register from './pages/Register'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Rooms} />
            <Route path="/sala/:room" exact component={Main} />
            <Route path="/login" exact component={Login} />
            <Route path="/cadastrar" exact component={Register} />
        </BrowserRouter>
    )
}