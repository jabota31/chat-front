import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { Container, NavBar, Logo, MainContainer, UnorderedList, ListItem, TextArea} from './components';
import axios from '../../service/api'

export default function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [newRoom, setNewRoom] = useState('');


    const addRoom = async (roomName) => {
        roomName = roomName.trim().replace(/\s/g,'_');
        const response = await axios('/room/' + roomName);
        const list = rooms;
        list.push(response.data.name)
        setRooms(list);
        setNewRoom('');

    }

    const onEnterPress = (e) => {
		if(e.key === "Enter" && e.shiftKey === false) {
		  addRoom(e.target.value);
		}
	}

    const fetchRooms = async () => {
        const response = await axios('/room');
        setRooms(response.data);
    }

    useEffect(() => {
        try {
            fetchRooms();
            setLoaded(true)
        } catch(e){
            console.log(e)
        }
        
        setLoaded(true);       
    }, [newRoom]);

	return (
		<Container>
			<NavBar>
				<Logo>Bate papo OUL</Logo>
            </NavBar>

            <MainContainer>
                <TextArea>
                    <button onClick={() => addRoom(newRoom)}>Criar sala</button>
                    <textarea value={newRoom} onChange={value => setNewRoom(value.target.value)} onKeyDown={onEnterPress} />
                </TextArea>
                {!loaded ? <p>Carregando...</p> : ''}
                <UnorderedList>
                    {loaded ? rooms.map((room,index) =>
                        <ListItem key={index}>
                            <Link to={`/sala/${room.name}`}>
                                {room.name}
                            </Link>
                        </ListItem>
                    ): ''}
                </UnorderedList>    
			</MainContainer>
		</Container>
	);
}