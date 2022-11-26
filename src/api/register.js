import axios from 'axios';

const BASE_URL = 'https://akomedico.onrender.com/api/v1/';
// const BASE_URL = 'http://localhost:3000/api/v1/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const registerUser = async (register) => {
	try {
		const res = await api.post('register', register);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
