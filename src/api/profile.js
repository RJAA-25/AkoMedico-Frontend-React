import axios from 'axios';

// const BASE_URL = 'https://akomedico.onrender.com/api/v1/profiles/';
const BASE_URL = 'http://localhost:3000/api/v1/profiles/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const createProfile = async (profile) => {
	try {
		const res = await api.post('create', profile);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
