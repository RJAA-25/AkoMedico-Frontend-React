import axios from 'axios';

// const BASE_URL = 'https://akomedico.onrender.com/api/v1/requests/';
const BASE_URL = 'http://localhost:3000/api/v1/requests/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const checkAccess = async () => {
	try {
		const res = await api.get('access');
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const getOverview = async () => {
	const res = await api.get('overview');
	return res.data;
};

export const getProfile = async () => {
	const res = await api.get('profile');
	return res.data;
};

export const getDoctors = async () => {
	const res = await api.get('doctors');
	return res.data;
};

export const getEmergencyContacts = async () => {
	const res = await api.get('emergency-contacts');
	return res.data;
};

export const getExistingConditions = async () => {
	const res = await api.get('existing-conditions');
	return res.data;
};
