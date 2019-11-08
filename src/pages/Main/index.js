import React, {useState} from 'react';
import { useParams} from "react-router";
import { Container, NavBar, Logo, MainContainer, PeopleArea, ChatArea, TextArea } from './components';

import socketIOClient from "socket.io-client";


export default function Main() {

	const endpoint = 'localhost:3334';


	const [messages, setMessages] = useState([ {message: "Oi, tudo bem?", minha: true}, 
					   {message: "Tudo, e você?", minha: false},
					   {message: "E aí galera", minha: false}])

	const [message, setMessage] = useState("")

	const addMessage = message => {
		if (message.trim() !== '') setMessages([...messages, {message, minha: true}])
	}

	const onEnterPress = (e) => {
		if(e.key === "Enter" && e.shiftKey === false) {
		  addMessage(e.target.value);
		  setMessage("");
		}
	}
	
	const socket = socketIOClient(endpoint);
	const {room} = useParams();

	socket.on('chat', (data) => {
		console.log(data)
		socket.emit('chat', 'Estou conectado');
		socket.emit('join_room', room);
	})

	return (
		<Container>
			<NavBar>
				<Logo>Bate papo OUL</Logo>
			</NavBar>
			<MainContainer>
				<ChatArea>
					{ messages.map(message => (
					<div className={message.minha ? "minha" : ""}>
						<p>
							{message.message}
						</p>
					</div>
					)) }
				</ChatArea>
				<PeopleArea></PeopleArea>
			</MainContainer>
			<TextArea>
				<textarea value={message} onChange={value => setMessage(value.target.value)} onKeyDown={onEnterPress}/>
				<button onClick={() => addMessage(message)}>Enviar</button>
			</TextArea>
		</Container>
	);
}