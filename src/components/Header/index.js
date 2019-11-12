import { NavBar, Logo, Exit } from './components';
import React, {useState, useEffect} from 'react';
import { Redirect, Link } from 'react-router-dom';

export default function Header() {

    const [loggedOut, setLoggedOut] = useState(false)

    const handleClick = () => {
        localStorage.removeItem('myToken');
        setLoggedOut(true)
        console.log(loggedOut);
    }

    useEffect(() => {
        setLoggedOut(false);
        console.log(loggedOut);
        
    });

    return (
        
        <NavBar>
            {loggedOut ? <Redirect to='/login' /> : ''}
            <Logo><Link to='/salas'>Bate Papo UOL</Link></Logo>
            <Exit onClick = {handleClick} >Sair</Exit>
        </NavBar>
    );

}

