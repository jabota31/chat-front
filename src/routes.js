import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Chat from './pages/Chat'
import Rooms from './pages/Rooms'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header';

export default function Routes() {
    return (
        <BrowserRouter>
            <Header></Header>
            <Route path="/salas" exact component={Rooms} />
            <Route path="/sala/:room" exact component={Chat} />
            <Route path="/login" exact component={Login} />
            <Route path="/cadastrar" exact component={Register} />
        </BrowserRouter>
    )
}