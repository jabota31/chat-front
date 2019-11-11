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
	transition: all 0.7s;

	&:hover {
		transform: scale(2) translateX(27px);
	}
`