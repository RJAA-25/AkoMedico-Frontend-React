import axios from 'axios';

const BASE_URL = 'https://akomedico.onrender.com/api/v1/';
// const BASE_URL = 'http://localhost:3000/api/v1/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const loginUser = async (session) => {
	try {
		const res = await api.post('login', session);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const logoutUser = async () => {
	try {
		const res = await api.post('logout');
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
