import { createSlice } from '@reduxjs/toolkit';

const initialDoctorState = {
	data: [],
	isChanged: false,
};

const doctorSlice = createSlice({
	name: 'doctor',
	initialState: initialDoctorState,
	reducers: {
		set(state, action) {
			state.data = action.payload;
			state.isChanged = true;
		},
		reset(state) {
			state.data = [];
			state.isChanged = false;
		},
	},
});

export const doctorActions = doctorSlice.actions;

export default doctorSlice.reducer;
