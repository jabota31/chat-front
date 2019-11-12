import styled from 'styled-components';

export const NavBar = styled.nav`
	position: fixed;
	z-index: 102;
	height: 10vh;
	width: 100%;
	display: flex;
	background: white;
	box-shadow: 0 2px 6px 4px rgba(0, 0, 0, 0.2);
`

export const Logo = styled.div`
	display: flex;
	justify-self: flex-end;
	margin-left: 10px;
	font-weight: bold;
	align-items: center;
	transition: all 0.3s;

	a {
		text-decoration: none;
		color: black;
	}

	&:hover {
		transform: scale(1.2);
	}
`

export const Exit = styled.button`
	margin-left: auto;
	width: 10%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	border: none;
	color: white;
	font-size: 1em;
	transition: 0.2s all;

	&:hover {
		background: rgba(0, 0, 0, 0.5);
	}
`;