import axios from 'axios';

// const BASE_URL = 'https://akomedico.onrender.com/api/v1/admissions/';
const BASE_URL = 'http://localhost:3000/api/v1/admissions/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const createAdmission = async (admission) => {
	try {
		const res = await api.post('create', admission);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const updateAdmission = async (admission, uid) => {
	try {
		const res = await api.patch(`update/${uid}`, admission);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const destroyAdmission = async (uid) => {
	try {
		const res = await api.delete(`destroy/${uid}`);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
