import React, {useState, useEffect} from 'react';
import axios from '../../service/api';
import { Redirect } from 'react-router-dom';

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
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


    return (
        <div>
            {renderRedirect()}
            <p>username:</p>
            <textarea value={username} onChange={value => setUsername(value.target.value)}></textarea>
            <p>senha:</p>
            <textarea value={password} onChange={value => setPassword(value.target.value)}></textarea>
            <p>confirmar senha:</p>
            <textarea value={passwordConfirmation} onChange={value => setPasswordConfirmation(value.target.value)}></textarea>
            <button onClick={send}>Cadastrar</button>
        </div>
    );
}