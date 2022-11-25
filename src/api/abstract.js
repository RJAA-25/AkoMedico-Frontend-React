import axios from 'axios';

// const BASE_URL = 'https://akomedico.onrender.com/api/v1/abstracts/';
const BASE_URL = 'http://localhost:3000/api/v1/abstracts/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const createAbstract = async (abstract, uid) => {
	try {
		const res = await api.post(`create/${uid}`, abstract);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const updateAbstract = async (abstract, uid) => {
	try {
		const res = await api.patch(`update/${uid}`, abstract);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
