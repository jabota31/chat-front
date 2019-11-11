import { NavBar, Logo} from './components';
import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';

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
            <Logo>Bate papo OUL</Logo>
            <button onClick = {handleClick} >Sair</button>
        </NavBar>
    );

}

