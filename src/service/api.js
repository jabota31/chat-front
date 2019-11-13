import axios from 'axios';

export default axios.create({
	baseURL: 'https://redeschatapi.herokuapp.com/',
	responseTime: 'json',
	timeout: 4000,
});
