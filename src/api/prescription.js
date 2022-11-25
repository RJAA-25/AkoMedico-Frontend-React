import axios from 'axios';

// const BASE_URL = 'https://akomedico.onrender.com/api/v1/prescriptions/';
const BASE_URL = 'http://localhost:3000/api/v1/prescriptions/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const createPrescription = async (prescription, uid) => {
	try {
		const res = await api.post(`create/${uid}`, prescription);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const updatePrescription = async (prescription, uid) => {
	try {
		const res = await api.patch(`update/${uid}`, prescription);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
