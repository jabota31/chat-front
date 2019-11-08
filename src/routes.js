import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './pages/Main'
import Rooms from './pages/Rooms'

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Rooms} />
            <Route path="/sala/:room" exact component={Main} />
        </BrowserRouter>
    )
}