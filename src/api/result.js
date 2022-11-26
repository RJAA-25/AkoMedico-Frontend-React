import axios from 'axios';

const BASE_URL = 'https://akomedico.onrender.com/api/v1/results/';
// const BASE_URL = 'http://localhost:3000/api/v1/results/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const createResult = async (result, uid) => {
	try {
		const res = await api.post(`create/${uid}`, result);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const updateResult = async (result, uid) => {
	try {
		const res = await api.patch(`update/${uid}`, result);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
