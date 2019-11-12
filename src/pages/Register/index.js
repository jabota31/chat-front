import React, {useState, useEffect} from 'react';
import axios from '../../service/api';
import { Redirect } from 'react-router-dom';

import { UserInput, PassInput, RegisterButton, Container } from './components';

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
        const response = await axios.post('/auth/register', data);
        console.log(response)

        if (response.status === 200) {
            const response =  await axios.post('/auth/login', data);
            console.log(response);
            const token = response.data.token;
            localStorage.setItem('myToken', token);
            setLogged(true)
        }
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
	
	            <RegisterButton onClick={send}>Cadastrar-se</RegisterButton>
			</div>

        </Container>
    );
}

