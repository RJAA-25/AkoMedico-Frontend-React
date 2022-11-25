import axios from 'axios';

// const BASE_URL = 'https://akomedico.onrender.com/api/v1/emergency-contacts/';
const BASE_URL = 'http://localhost:3000/api/v1/emergency-contacts/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const createContact = async (contact) => {
	try {
		const res = await api.post('create', contact);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const updateContact = async (contact, id) => {
	try {
		const res = await api.patch(`update/${id}`, contact);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const destroyContact = async (id) => {
	try {
		const res = await api.delete(`destroy/${id}`);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
