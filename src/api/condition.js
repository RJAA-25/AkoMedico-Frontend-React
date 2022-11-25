import axios from 'axios';

// const BASE_URL = 'https://akomedico.onrender.com/api/v1/conditions/';
const BASE_URL = 'http://localhost:3000/api/v1/conditions/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const createCondition = async (condition) => {
	try {
		const res = await api.post('create', condition);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const updateCondition = async (condition, id) => {
	try {
		const res = await api.patch(`update/${id}`, condition);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const destroyCondition = async (id) => {
	try {
		const res = await api.delete(`destroy/${id}`);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
