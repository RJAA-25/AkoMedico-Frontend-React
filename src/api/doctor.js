import axios from 'axios';

const BASE_URL = 'https://akomedico.onrender.com/api/v1/doctors/';
// const BASE_URL = 'http://localhost:3000/api/v1/doctors/';

const api = axios.create({
	baseURL: BASE_URL,
	xsrfCookieName: 'CSRF-TOKEN',
	xsrfHeaderName: 'X-CSRF-Token',
	withCredentials: true,
});

export const createDoctor = async (doctor) => {
	try {
		const res = await api.post('create', doctor);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const updateDoctor = async (doctor, id) => {
	try {
		const res = await api.patch(`update/${id}`, doctor);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};

export const destroyDoctor = async (id) => {
	try {
		const res = await api.delete(`destroy/${id}`);
		return res;
	} catch (error) {
		return error?.response ? error.response : error;
	}
};
