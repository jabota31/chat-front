import React, {useState, useEffect} from 'react';
import { useParams, Redirect } from "react-router";
import { Container, MainContainer, PeopleArea, ChatArea, TextArea } from './components';
import Header from '../../components/Header';

import socketIOClient from "socket.io-client";
import axios from '../../service/api';


export default function Chat(props) {

	const endpoint = 'localhost:3334';
	const {room} = useParams();
	
	const [messages, setMessages] = useState([])
	const [text, setText] = useState('');
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [user, setUser] = useState('');
	const [loaded, setLoaded] = useState(false);
	const [doRedirect, setDoRedirect] = useState(false);
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		getUsername().then((user) => socket.emit('join_room', { room, user }));

		const socket = socketIOClient(endpoint);
		setSocket(socket);
		
		socket.on('message', (message) => {
			axios.get('/message/' + room).then(mess => setMessages([...mess.data, message]));
		})
	
		socket.on('user_connected', () => {
			fetchConnectedUsers(room);
		})

		return function cleanup() {
			getUsername().then((user) => socket.emit('leave_room', { room, user }))
		}
	}, []);

	useEffect(() => {

        if (!loaded) {
            try {
				fetchMessages(room);
				setLoaded(true);
            } catch(e) {
                console.log(e)
            }
		}
      
	});
	
	useEffect(() => {
		fetchConnectedUsers(room);
	}, [messages]);

	const renderRedirect = () => {
        if (doRedirect) {
          return <Redirect to='/login' />
        }
	}
	
	const fetchConnectedUsers = async (room) => {
		const response = await axios.get('/room/connected/' + room);
		setConnectedUsers(response.data);
	};
	
	const getUsername = async () => {
		
		try {
			const token = localStorage.getItem('myToken');
			const response = await axios.post('/auth/verify', {token});
			setUser(response.data.user.username);
			return response.data.user.username
		}
		catch(e) {
			setDoRedirect(true);
		}	
	}

	const addMessage = async () => {
		if (text.trim() !== ''){
			const data = {text, room, user};
			setMessages([...messages, data])
			socket.emit('message', data)
			saveMessage(data);
			setText('');

		}
	}

	const onEnterPress = (e) => {
		if(e.key === "Enter" && e.shiftKey === false) {
		  addMessage(e.target.value);
		  setText('');
		}
	}

	const fetchMessages = async room => {
		const response = await axios.get('/message/' + room);
		setMessages(response.data);
		return response.data;
	}

	const saveMessage = async (data) => {
		await axios.post('/message/save', data);
	}

	return (
		
		<Container>
			{renderRedirect()}
			<Header user={props.location.search.substring(1).split("=")[1]}></Header>
			<MainContainer>
				<ChatArea>
					{ messages.map((message, index) => (
					<div className={message.user === user ? "minha" : ""} key={index}>
						<p>
							{message.user === user ? "Eu" : message.user} 🠒 {message.text}
						</p>
					</div>
					)) }
				</ChatArea>
				<PeopleArea>
					{ connectedUsers.map((user, index) => (
						<h1 key={index}>{user}</h1>
					)) }
				</PeopleArea>
			</MainContainer>
			<TextArea>
				<textarea value={text} onChange={value => setText(value.target.value)} onKeyDown={onEnterPress}/>
					<button onClick={addMessage}>Enviar</button>
			</TextArea>
		</Container>
	);
}