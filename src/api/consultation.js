import axios from 'axios';

const BASE_URL = 'https://akomedico.onrender.com/api/v1/consultations/';
// const BASE_URL = 'http://localhost:3000/api/v1/consultations/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const createConsultation = async (consultation) => {
	try {
		const res = await api.post('create', consultation);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const updateConsultation = async (consultation, uid) => {
	try {
		const res = await api.patch(`update/${uid}`, consultation);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const destroyConsultation = async (uid) => {
	try {
		const res = await api.delete(`destroy/${uid}`);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
