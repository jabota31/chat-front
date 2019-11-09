import React, {useState, useEffect} from 'react';
import { useParams} from "react-router";
import { Container, NavBar, Logo, MainContainer, PeopleArea, ChatArea, TextArea } from './components';

import socketIOClient from "socket.io-client";
import axios from '../../service/api';


export default function Main() {

	const endpoint = 'localhost:3334';

	const socket = socketIOClient(endpoint);
	const {room} = useParams();

	// const [messages, setMessages] = useState([ {message: "Oi, tudo bem?", minha: true}, 
	// 				   {message: "Tudo, e você?", minha: false},
	// 				   {message: "E aí galera", minha: false}])

	const [messages, setMessages] = useState([])
	const [text, setText] = useState("");
	const [user, setUser] = useState("Anônimo");
	const [loaded, setLoaded] = useState(false);

	const addMessage = async () => {
		// if (text.trim() !== '') setMessages([...messages, {text, minha: true}])
			const data = {text, room, user};
			socket.emit('message', data)
	}

	const saveMessage = async (data) => {
		await axios.post('/message/save', data);
	} 


	const handleSend = async (text) => {
		if (text.trim() !== '') {
			const data = {text, room, user};
			saveMessage(data);
			addMessage()
		}
	}

	const onEnterPress = (e) => {
		if(e.key === "Enter" && e.shiftKey === false) {
		  addMessage(e.target.value);
		  setText('');
		}
	}

	const fetchMessages = async room => {
		const response = await axios('/message/'+room);
		setMessages(response.data)
	}

	useEffect(() => {

        if (!loaded) {
            try {
				fetchMessages(room)
				setLoaded(true);
            } catch(e){
                console.log(e)
            }
        }
      
    });

	socket.on('chat', (data) => {
		console.log(data);
		socket.emit('chat', 'Estou conectado');
		socket.emit('join_room', room);
	})

	socket.on('message', (message) => {
		message.minha = false;
		console.log(message);
		setMessages([message,...messages]);
	})

	console.log(messages)

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
							{message.minha ? "Eu" : message.user} ---> {message.text}
						</p>
					</div>
					)) }
				</ChatArea>
				<PeopleArea></PeopleArea>
			</MainContainer>
			<TextArea>
				<textarea value={text} onChange={value => setText(value.target.value)} onKeyDown={onEnterPress}/>
				<button onClick={() => handleSend(text)}>Enviar</button>
			</TextArea>
		</Container>
	);
}