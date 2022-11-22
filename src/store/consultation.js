import { createSlice } from '@reduxjs/toolkit';

const initialConsultationState = {
	data: [],
	isChanged: false,
};

const consultationSlice = createSlice({
	name: 'consultation',
	initialState: initialConsultationState,
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

export const consultationActions = consultationSlice.actions;

export default consultationSlice.reducer;
