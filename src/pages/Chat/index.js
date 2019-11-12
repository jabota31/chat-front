import React, {useState, useEffect} from 'react';
import { useParams, Redirect } from "react-router";
import { Container, MainContainer, PeopleArea, ChatArea, TextArea } from './components';
import Header from '../../components/Header';

import socketIOClient from "socket.io-client";
import axios from '../../service/api';


export default function Chat() {

	const endpoint = 'localhost:3334';

	const socket = socketIOClient(endpoint);
	const {room} = useParams();

	const [messages, setMessages] = useState([])
	const [text, setText] = useState('');
	const [user, setUser] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [doRedirect, setDoRedirect] = useState(false);

	useEffect(() => {

		if (user === '') {
			getUsername();
		}

        if (!loaded) {
            try {
				fetchMessages(room);
				setLoaded(true);
            } catch(e){
                console.log(e)
            }
		}
		
		socket.on('chat', (data) => {
			socket.emit('chat', 'Estou conectado');
			socket.emit('join_room', room);
		})
	
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		})
      
	});

	const renderRedirect = () => {
        if (doRedirect) {
          return <Redirect to='/login' />
        }
    }
	
	const getUsername = async () => {
		
		try {
			const token = localStorage.getItem('myToken');
			const response = await axios.post('/auth/verify', {token});
			setUser(response.data.user.username);
		}
		catch(e) {
			setDoRedirect(true);
		}	
	}

	const addMessage = () => {
		if (text.trim() !== ''){
			const data = {text, room, user};
			socket.emit('message', data);
			setText('');
			saveMessage(data);
		}
	}

	const saveMessage = async (data) => {
		await axios.post('/message/save', data);
	}

	const onEnterPress = (e) => {
		if(e.key === "Enter" && e.shiftKey === false) {
		  addMessage(e.target.value);
		}
	}

	const fetchMessages = async room => {
		const response = await axios('/message/'+room);
		setMessages(response.data,...messages)
	}




	return (
		
		<Container>
			{renderRedirect()}
			<Header></Header>
			<MainContainer>
				<ChatArea>
					{ messages.map(message => (
					<div className={message.minha ? "minha" : ""}>
						<p>
							{message.minha ? "Eu" : message.user} ---> {message.text}
						</p>
					</div>
					)) }
				</ChatArea>
				<PeopleArea></PeopleArea>
			</MainContainer>
			<TextArea>
				<textarea value={text} onChange={value => setText(value.target.value)} onKeyDown={onEnterPress}/>
				<button onClick={addMessage}>Enviar</button>
			</TextArea>
		</Container>
	);
}