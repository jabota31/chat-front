import styled from 'styled-components';


export const UserInput = styled.input`
	width: 50%;
	height: 25px;
	margin: 10px auto;
	margin-bottom: 0;
	display: flex;

	&::placeholder {
		text-align: center;
	}
`;

export const PassInput = styled.input`
	width: 50%;
	height: 25px;
	margin: 10px auto;
	margin-bottom: 20px;

	&::placeholder {
		text-align: center;
	}
`;

export const LogButton = styled.button`
	width: 50%;
	height: 30px;
	margin: 0 auto;
`;

export const Container = styled.div`	
	background: grey;
	height: 100vh;
	display: flex;

	div {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin: auto;
	}
`;
