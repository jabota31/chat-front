import styled from 'styled-components';

export const Logo = styled.div`
	display: flex;
	justify-self: flex-end;
	margin-left: 10px;
	font-weight: bold;
	align-items: center;
	transition: all 0.7s;

	&:hover {
		transform: scale(2) translateX(27px);
	}
`

export const NavBar = styled.nav`
	position: fixed;
	z-index: 102;
	height: 10vh;
	width: 100%;
	display: flex;
	background: white;
    box-shadow: 0 2px 6px 4px rgba(0, 0, 0, 0.2);
`    

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	background: rgb(240, 240, 240);
	height: 100vh;
	overflow: hidden;
`

export const MainContainer = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 10vh;
	display: flex;
	flex-direction: column;
`

export const RoomList = styled.div`
    display: flex;
	flex-wrap: wrap;
	background: grey;
	margin: 0;
	padding-top: 10px;
	height: 80vh;

	a {
		text-decoration: none;
		color: black;
	}
`

export const Room = styled.div`
	background: lightgray;
	height: 20px;
	width: 108px;
	overflow: hidden;
	padding: 10px;
	border: 1px solid black;
	border-radius: 10px;
	margin: 0 10px;

	&:hover {
		min-width: 108px;
		overflow: visible; 
		white-space: normal;
		width: auto;
	}
`

export const ListArea = styled.div`
	width: 70%;
	overflow: auto;

	div {
		display: flex;
		background: rgba(0, 0, 0, 0.7);
		height: 5vh;
		border-bottom: 1px solid white;
		
		p {
		margin: auto 30px;
			margin-left: auto;
			color: white;
		}
	}

	div.minha {
		background: grey;

		p {
			margin: auto 30px;
		}
	}
`

export const TextArea = styled.div`
	display: flex;
	background: rgba(50, 50, 50, 0.8);
	width: 100%;
	height: 10vh;
	box-shadow: 0 2px 6px 4px rgba(0, 0, 0, 0.2);

	textarea {
		width: 75%;
		height: 50%;
		margin: auto 20px;
		box-shadow: 0 2px 6px 4px rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(0, 0, 0, 0.2);
		word-break: break-word;
		resize: none;
		overflow: hidden;
	}

	button {
		height: 50%;
		width: 15%;
		margin: auto 40px;
		box-shadow: 0 2px 6px 4px rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(0, 0, 0, 0.2);
		font-size: 1em;
	}
`

