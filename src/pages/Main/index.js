import React, {useState} from 'react';

import { Container, NavBar, Logo, MainContainer, PeopleArea, ChatArea, TextArea } from './components';


export default function Main() {


	const [messages, setMessages] = useState([ {message: "Oi, tudo bem?", minha: true}, 
					   {message: "Tudo, e você?", minha: false},
					   {message: "E aí galera", minha: false}])

	const [message, setMessage] = useState("")

	const addMessage = message => {
		if (message.trim() !== '') setMessages([...messages, {message, minha: true}])
	}

	const onEnterPress = (e) => {
		if(e.key === "Enter" && e.shiftKey === false) {
		  addMessage(e.target.value)
		  setMessage("")
		}
	  }

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