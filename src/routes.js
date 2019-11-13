import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Chat from './pages/Chat'
import Rooms from './pages/Rooms'
import Login from './pages/Login'
import Register from './pages/Register'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/salas" component={Rooms} />
            <Route path="/sala/:room" component={Chat} />
            <Route path="/login" component={Login} />
            <Route path="/cadastrar" component={Register} />
            <Route path="/" exact component={Rooms} />
        </BrowserRouter>
    )
}