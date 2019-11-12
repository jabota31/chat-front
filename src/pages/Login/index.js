import React, {useState, useEffect} from 'react';
import axios from '../../service/api';
import { Redirect } from 'react-router-dom';

import { UserInput, PassInput, LogButton, Container } from './components';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [logged, setLogged] = useState(false);

    useEffect(()=>{

    })

    const renderRedirect = () => {
        if (logged) {
          return <Redirect to='/salas' />
        }
    }

    const send = async () => {
        const data = {username, password}
        console.log(data);
        const response = await axios.post('/auth/login', data);
        console.log(response);
        localStorage.setItem('myToken', response.data.token);
        setLogged(true);
	}
	
	const onEnterPress = (e) => {
		if(e.key === "Enter" && e.shiftKey === false) {
		  send();
		}
	}

    return (
        <Container>
            {renderRedirect()}

			<div>
				<UserInput type="text" placeholder="Username" value={username} 
				onChange={value => setUsername(value.target.value)}
				onKeyDown={onEnterPress} />
				<PassInput type="password" placeholder="Password" value={password}
				onChange={value => setPassword(value.target.value)}
				onKeyDown={onEnterPress} />
	
	            <LogButton onClick={send}>Logar</LogButton>
			</div>

        </Container>
    );
}

