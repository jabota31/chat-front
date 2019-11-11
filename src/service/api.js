import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:3333/',
	responseTime: 'json',
	timeout: 4000,
});
