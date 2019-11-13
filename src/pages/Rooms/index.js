import React, {useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../../components/Header';

import { Container, MainContainer, RoomList, Room, TextArea} from './components';
import axios from '../../service/api'

export default function Rooms() {

    const [rooms, setRooms] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [newRoom, setNewRoom] = useState('');
    const [doRedirect, setDoRedirect] = useState(false);
    const [user, setUser] = useState('');

    useEffect(() => {

        if (user === '') {
			getUsername();
		}

        if (!loaded) {
            try {
                fetchRooms();
                setLoaded(true)
            } catch(e){
                console.log(e)
            }
        }
      
    }, [user, loaded]);

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

    const addRoom = async (roomName) => {
		roomName = roomName.trim().replace(/\s/g,'_');
        const response = await axios('/room/' + roomName);
        setRooms([...rooms, response.data.name]);
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
            {renderRedirect()}
            <Header></Header>
            <MainContainer>
                {!loaded ? <p>Carregando...</p> : ''}
                <RoomList>
                    {loaded ? rooms.map((room,index) =>
						<Link to={`/sala/${room.name}?user=${user}`} key={index}>
                        	<Room>
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