import React, {useState, useEffect} from 'react';
import axios from '../../service/api';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [sent, setSent] = useState(false);

    useEffect(()=>{

    })


    const send = async () => {
        const data = {username, password}
        console.log(data);
        const response = await axios.post('/auth/login', data);
        console.log(response);
        localStorage.setItem('myToken', response.data.token);
    }


    return (
        <div>
            <p>username:</p>
            <textarea value={username} onChange={value => setUsername(value.target.value)}></textarea>
            <p>senha:</p>
            <textarea value={password} onChange={value => setPassword(value.target.value)}></textarea>
            <button onClick={send}>Logar</button>
        </div>
    );
}

