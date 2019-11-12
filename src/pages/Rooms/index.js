import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import { Container, NavBar, Logo, MainContainer, RoomList, Room, TextArea} from './components';
import axios from '../../service/api'

export default function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [newRoom, setNewRoom] = useState('');

    useEffect(() => {

        if (!loaded) {
            try {
                fetchRooms();
                setLoaded(true)
            } catch(e){
                console.log(e)
            }
        }
      
    });


    const addRoom = async (roomName) => {
        roomName = roomName.trim().replace(/\s/g,'_');
        const response = await axios('/room/' + roomName);
        const list = rooms;
        list.push(response.data.name)
        setRooms(list);
        setNewRoom('');
        setLoaded(false);

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


	return (
        <Container>
            <Header></Header>
            <MainContainer>
                {!loaded ? <p>Carregando...</p> : ''}
                <RoomList>
                    {loaded ? rooms.map((room,index) =>
						<Link to={`/sala/${room.name}`}>
                        	<Room key={index}>
                                {room.name}
                        	</Room>
						</Link>
                    ): ''}
                </RoomList>    
                <TextArea>
                    <button onClick={() => addRoom(newRoom)}>Criar sala</button>
                    <textarea value={newRoom} onChange={value => setNewRoom(value.target.value)} onKeyDown={onEnterPress} />
                </TextArea>
			</MainContainer>
		</Container>
	);
}