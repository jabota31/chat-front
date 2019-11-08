import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:3334',
	responseTime: 'json',
	timeout: 4000,
});
